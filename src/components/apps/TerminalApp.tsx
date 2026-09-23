import React, { useState, useRef, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Terminal as TerminalIcon, Hash, Copy, Trash2, ArrowUp, Send } from 'lucide-react';
import { ROOT_FILESYSTEM } from '../../data/mockSystem';

interface CommandHistoryItem {
  command: string;
  output: string;
  isRoot: boolean;
  cwd: string;
}

export const TerminalApp: React.FC = () => {
  const {
    isRooted,
    magiskVersion,
    zygiskEnabled,
    selinuxStatus,
    setSelinuxStatus,
    rebootDevice,
    installedApps,
    addLogcat,
    showToast,
  } = useEmulator();

  const [isSu, setIsSu] = useState<boolean>(true);
  const [cwd, setCwd] = useState<string>('/data/data/com.termux/files/home');
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'su',
      output: 'MagiskSU v27.0: Requesting root access...\nRoot shell authenticated (UID 0: root). Type "help" for commands.',
      isRoot: true,
      cwd: '/data/data/com.termux/files/home',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    addLogcat('I', 'Termux', `Executing: "${trimmed}" as ${isSu ? 'root' : 'u0_a182'}`);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    let out = '';

    switch (cmd) {
      case 'help':
        out = `Android 14 Toybox / Magisk Root Shell Commands:
• su, exit           - Switch to root UID 0 / exit root
• whoami, id         - Display current user identity & groups
• magisk, magisk -v  - Magisk daemon CLI & version info
• zygisk             - Check Zygisk injection status
• getenforce         - Get SELinux status (Enforcing/Permissive)
• setenforce 0 / 1   - Toggle SELinux Permissive / Enforcing
• getprop [key]      - Read Android system properties
• uname -a           - Linux kernel architecture & build info
• cat /proc/cpuinfo  - CPU hardware specifications
• cat /proc/version  - Linux kernel version string
• pm list packages   - List installed Android packages
• ls, cd, pwd        - File system exploration
• mount              - List mounted filesystems
• reboot             - Restart Android 14 OS
• clear              - Clear terminal display`;
        break;

      case 'su':
        if (!isRooted) {
          out = 'su: MagiskSU is disabled in Magisk Manager.';
        } else {
          setIsSu(true);
          out = 'MagiskSU v27.0: Shell UID changed to 0 (root).';
          showToast('Termux: Shell running with root privileges');
        }
        break;

      case 'exit':
        if (isSu) {
          setIsSu(false);
          out = 'Exited root shell. Now running as u0_a182.';
        } else {
          out = 'Session terminated. Type "su" to re-open.';
        }
        break;

      case 'whoami':
        out = isSu ? 'root' : 'u0_a182';
        break;

      case 'id':
        out = isSu
          ? 'uid=0(root) gid=0(root) groups=0(root),1004(input),1007(log),1011(adb),1015(sdcard_rw),1028(sdcard_r),3001(net_bt_admin),3002(net_bt),3003(inet) context=u:r:magisk:s0'
          : 'uid=10182(u0_a182) gid=10182(u0_a182) groups=10182(u0_a182),3003(inet),9997(everybody)';
        break;

      case 'magisk':
        if (args[0] === '-v' || args[0] === '--version') {
          out = `${magiskVersion}:MAGISK`;
        } else if (args[0] === '-V') {
          out = '27000';
        } else {
          out = `Magisk v27.0 (27000) - Android Systemless Root Interface
by topjohnwu

Usage: magisk [options]
   or: magisk [applet [arguments]...]

Options:
   -c, --daemon         start magisk daemon
   -v, --version        print version string
   -V, --version-code   print version code
   --install-module     flash zip module
   --zygisk             query zygisk status (${zygiskEnabled ? 'active' : 'disabled'})`;
        }
        break;

      case 'zygisk':
        out = zygiskEnabled
          ? `[Zygisk] Status: ACTIVE\nCompanion PID: 412 (zygote64)\nHooks loaded: 3 (LSPosed, PlayIntegrityFix, Shamiko)`
          : `[Zygisk] Status: DISABLED`;
        break;

      case 'uname':
        out = 'Linux localhost 5.15.110-android14-9-g1234567 #1 SMP PREEMPT Wed Sep 23 07:50:00 UTC 2026 aarch64 Android';
        break;

      case 'cat':
        if (args[0] === '/proc/cpuinfo') {
          out = `Processor       : AArch64 Processor rev 4 (aarch64)
Hardware        : Google Tensor G3 (husky)
BogoMIPS        : 38.40
Features        : fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid
CPU implementer : 0x41
CPU architecture: 8
CPU variant     : 0x3
CPU part        : 0xd46
CPU revision    : 1
Number of Cores : 9 Cores (1x Cortex-X3 @ 3.0GHz, 4x Cortex-A715 @ 2.45GHz, 4x Cortex-A510 @ 2.15GHz)`;
        } else if (args[0] === '/proc/version') {
          out = 'Linux version 5.15.110-android14-9-g1234567 (android-build@google.com) (Android (10087095, based on r487747c) clang version 17.0.2) #1 SMP PREEMPT Wed Sep 23 07:50:00 UTC 2026';
        } else if (args[0] === '/system/build.prop') {
          out = `ro.build.version.release=14\nro.build.version.sdk=34\nro.product.model=Pixel 8 Pro\nro.magisk.version=27.0`;
        } else {
          out = `cat: ${args[0] || 'missing file'}: No such file or directory`;
        }
        break;

      case 'getprop':
        if (args[0] === 'ro.build.version.release') {
          out = '14';
        } else if (args[0] === 'ro.build.version.sdk') {
          out = '34';
        } else if (args[0] === 'ro.product.model') {
          out = 'Pixel 8 Pro';
        } else if (args[0] === 'ro.product.manufacturer') {
          out = 'Google';
        } else {
          out = `[ro.build.version.release]: [14]\n[ro.build.version.sdk]: [34]\n[ro.product.brand]: [google]\n[ro.product.model]: [Pixel 8 Pro]\n[ro.magisk.version]: [27.0]`;
        }
        break;

      case 'getenforce':
        out = selinuxStatus;
        break;

      case 'setenforce':
        if (!isSu) {
          out = 'setenforce: Permission denied. Root access required.';
        } else if (args[0] === '0') {
          setSelinuxStatus('Permissive');
          out = 'SELinux set to Permissive';
          showToast('SELinux: Permissive mode');
        } else if (args[0] === '1') {
          setSelinuxStatus('Enforcing');
          out = 'SELinux set to Enforcing';
          showToast('SELinux: Enforcing mode');
        } else {
          out = 'Usage: setenforce [0|1]';
        }
        break;

      case 'pm':
        if (args[0] === 'list' && args[1] === 'packages') {
          out = installedApps.map((a) => `package:${a.packageName}`).join('\n');
        } else {
          out = 'Usage: pm list packages';
        }
        break;

      case 'pwd':
        out = cwd;
        break;

      case 'cd':
        if (!args[0] || args[0] === '~') {
          setCwd('/data/data/com.termux/files/home');
        } else if (args[0] === '/') {
          setCwd('/');
        } else if (args[0] === '..') {
          const parts = cwd.split('/').filter(Boolean);
          parts.pop();
          setCwd('/' + parts.join('/'));
        } else {
          const newPath = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          setCwd(newPath);
        }
        break;

      case 'ls':
        const dirItems = ROOT_FILESYSTEM[cwd] || ROOT_FILESYSTEM['/'] || [];
        out = dirItems
          .map((i) => `${i.permissions}  ${i.owner}  ${i.group}  ${i.size || '4096'}  ${i.name}`)
          .join('\n');
        break;

      case 'mount':
        out = `/dev/block/by-name/system on /system type erofs (ro,nodev,noatime)
/dev/block/by-name/userdata on /data type f2fs (rw,nosuid,nodev,noatime)
magisk on /sbin type tmpfs (rw,relatime,mode=755)
/data/adb/magisk/magisk on /system/xbin/su type tmpfs (rw,relatime)`;
        break;

      case 'reboot':
        out = 'Rebooting Android 14 virtual machine...';
        rebootDevice();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        out = `/system/bin/sh: ${cmd}: not found (type 'help' for available commands)`;
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: out,
        isRoot: isSu,
        cwd,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="w-full h-full bg-black text-emerald-400 font-mono text-xs flex flex-col select-none overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 border-b border-white/10 px-3 py-2 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <TerminalIcon size={15} className="text-emerald-400" />
          <span className="font-bold text-xs text-white">Termux Root Console</span>
          {isSu && (
            <span className="flex items-center gap-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40">
              <Hash size={10} strokeWidth={3} />
              root
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => executeCommand('help')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
          >
            help
          </button>
          <button
            onClick={() => setHistory([])}
            className="p-1 rounded text-slate-400 hover:text-white"
            title="Clear output"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Scroll Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 select-text scrollbar-none font-mono">
        <div className="text-slate-500 text-[11px] leading-relaxed">
          Android 14 (API 34) Toybox Shell / MagiskSU v27.0 Environment
          <br />
          Type <span className="text-emerald-300 font-bold">help</span> to view available toybox & root commands.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 flex-wrap">
              <span className={item.isRoot ? 'text-red-400 font-bold' : 'text-cyan-400'}>
                {item.isRoot ? 'root@husky' : 'u0_a182@husky'}
              </span>
              <span className="text-slate-500">:</span>
              <span className="text-amber-300/90 truncate max-w-[160px]">{item.cwd}</span>
              <span className="text-white font-bold">{item.isRoot ? '#' : '$'}</span>
              <span className="text-white">{item.command}</span>
            </div>

            {item.output && (
              <pre className="text-slate-300 text-[11px] whitespace-pre-wrap pl-2 leading-relaxed opacity-95">
                {item.output}
              </pre>
            )}
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input */}
      <div className="p-2 bg-slate-950 border-t border-white/10 flex items-center gap-2">
        <span className={isSu ? 'text-red-400 font-bold' : 'text-cyan-400'}>
          {isSu ? '#' : '$'}
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isSu ? "Enter root command (e.g. 'uname -a', 'magisk -v', 'id')..." : "Type 'su' for root..."}
          className="bg-transparent flex-1 text-white text-xs focus:outline-none placeholder-slate-600 font-mono"
          autoFocus
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
        >
          <Send size={13} />
        </button>
      </div>

      {/* Quick Root Command Chips */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-900/80 border-t border-white/5 overflow-x-auto scrollbar-none text-[10px]">
        {['su', 'whoami', 'id', 'magisk -v', 'zygisk', 'uname -a', 'cat /proc/cpuinfo', 'getenforce', 'ls', 'reboot'].map(
          (cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 whitespace-nowrap"
            >
              {cmd}
            </button>
          )
        )}
      </div>
    </div>
  );
};
