import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Home,
  Search,
  PlusSquare,
  Film,
  User,
  MoreHorizontal,
  Sparkles,
  Camera,
} from 'lucide-react';

interface Post {
  id: string;
  username: string;
  avatarBg: string;
  location: string;
  gradientImg: string;
  caption: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  time: string;
  comments: string[];
}

export const InstagramApp: React.FC = () => {
  const { showToast } = useEmulator();

  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'reels' | 'profile'>('home');
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p1',
      username: 'pixel_photographer',
      avatarBg: 'from-amber-500 to-red-600',
      location: 'Mountain View, California',
      gradientImg: 'from-blue-600 via-indigo-700 to-purple-900',
      caption: 'Captured with Pixel 8 Pro 50MP Main Sensor + Night Sight 📸 Android 14 color calibration is incredible!',
      likes: 1240,
      liked: false,
      saved: false,
      time: '2 hours ago',
      comments: ['Colors look vibrant!', 'Sensor dynamic range is unmatched.'],
    },
    {
      id: 'p2',
      username: 'magisk_modder',
      avatarBg: 'from-emerald-500 to-teal-700',
      location: 'Tokyo, Japan (Akihabara)',
      gradientImg: 'from-emerald-700 via-teal-800 to-slate-900',
      caption: 'Testing systemless Zygisk LSPosed hooks on custom kernel 5.15. Play Integrity is passing MEETS_DEVICE_INTEGRITY ⚡',
      likes: 890,
      liked: true,
      saved: false,
      time: '5 hours ago',
      comments: ['Which module are you using for SafetyNet?', 'Clean setup!'],
    },
  ]);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newLiked = !p.liked;
          return {
            ...p,
            liked: newLiked,
            likes: newLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const toggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newSaved = !p.saved;
          showToast(newSaved ? 'Saved to collection' : 'Removed from collection');
          return { ...p, saved: newSaved };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, text],
          };
        }
        return p;
      })
    );
    setCommentInput((prev) => ({ ...prev, [postId]: '' }));
    showToast('Comment posted');
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-black border-b border-white/10 flex items-center justify-between">
        <span className="text-lg font-black tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent font-serif">
          Instagram
        </span>

        <div className="flex items-center gap-4 text-white">
          <Heart size={20} className="hover:text-red-500 cursor-pointer" />
          <div className="relative cursor-pointer">
            <Send size={19} className="-mt-0.5" />
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 rounded-full text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-14">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Stories Tray */}
            <div className="px-3 py-2.5 flex items-center gap-3 overflow-x-auto scrollbar-none border-b border-white/10">
              <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-neutral-900 border-2 border-dashed border-white/30 flex items-center justify-center relative">
                  <User size={22} className="text-slate-400" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow">
                    +
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Your story</span>
              </div>

              {['Alex_Dev', 'Sarah_J', 'Google_IO', 'TensorG3', 'LineageOS'].map((name, i) => (
                <div
                  key={name}
                  onClick={() => showToast(`Viewing story of @${name}`)}
                  className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow">
                    <div className="w-full h-full rounded-full bg-black border border-black flex items-center justify-center font-bold text-xs">
                      {name[0]}
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-300 truncate max-w-[55px]">{name}</span>
                </div>
              ))}
            </div>

            {/* Posts Stream */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="space-y-2.5">
                  {/* Post Header */}
                  <div className="px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-tr ${post.avatarBg} flex items-center justify-center text-xs font-bold`}
                      >
                        {post.username[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{post.username}</span>
                        <span className="text-[10px] text-neutral-400 block">{post.location}</span>
                      </div>
                    </div>
                    <MoreHorizontal size={16} className="text-neutral-400" />
                  </div>

                  {/* Post Image */}
                  <div
                    onDoubleClick={() => toggleLike(post.id)}
                    className={`w-full aspect-square bg-gradient-to-br ${post.gradientImg} flex flex-col items-center justify-center p-6 relative cursor-pointer group shadow-inner`}
                  >
                    <div className="text-center space-y-2">
                      <Sparkles size={40} className="text-white/80 mx-auto" />
                      <span className="text-xs font-mono text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm block">
                        Android 14 Ultra HDR Shot
                      </span>
                    </div>
                  </div>

                  {/* Post Action Buttons */}
                  <div className="px-3 space-y-1.5">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={22}
                            className={post.liked ? 'text-red-500 fill-current' : ''}
                          />
                        </button>
                        <MessageCircle size={21} className="hover:text-neutral-400" />
                        <Send size={20} className="hover:text-neutral-400 -mt-0.5" />
                      </div>
                      <button onClick={() => toggleSave(post.id)}>
                        <Bookmark
                          size={20}
                          className={post.saved ? 'text-white fill-current' : ''}
                        />
                      </button>
                    </div>

                    <span className="text-xs font-bold block">{post.likes.toLocaleString()} likes</span>

                    {/* Caption */}
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold mr-1.5">{post.username}</span>
                      <span className="text-neutral-200">{post.caption}</span>
                    </div>

                    {/* Comments list */}
                    {post.comments.length > 0 && (
                      <div className="space-y-0.5 pt-1">
                        {post.comments.map((c, i) => (
                          <div key={i} className="text-[11px] text-neutral-300">
                            <span className="font-semibold text-neutral-200 mr-1.5">user_{i + 1}</span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInput[post.id] || ''}
                        onChange={(e) =>
                          setCommentInput((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none flex-1"
                      />
                      {commentInput[post.id]?.trim() && (
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="text-xs text-blue-500 font-bold hover:text-blue-400"
                        >
                          Post
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-neutral-500 block uppercase font-mono">
                      {post.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-500 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
              </div>
              <div className="flex gap-6 text-center text-xs">
                <div>
                  <span className="font-bold block text-sm">48</span>
                  <span className="text-neutral-400">Posts</span>
                </div>
                <div>
                  <span className="font-bold block text-sm">1.8K</span>
                  <span className="text-neutral-400">Followers</span>
                </div>
                <div>
                  <span className="font-bold block text-sm">340</span>
                  <span className="text-neutral-400">Following</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white">Android Power User</h3>
              <p className="text-xs text-neutral-300 mt-0.5">
                Android 14 API 34 • Magisk v27.0 Rooted • Tensor G3 Lab
              </p>
            </div>

            <button className="w-full py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-bold hover:bg-neutral-700">
              Edit profile
            </button>

            {/* Profile Grid */}
            <div className="grid grid-cols-3 gap-1 pt-2">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-600"
                >
                  <Sparkles size={18} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-black border-t border-white/10 flex items-center justify-around text-white z-20">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-white' : 'text-neutral-500'}>
          <Home size={22} />
        </button>
        <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'text-white' : 'text-neutral-500'}>
          <Search size={22} />
        </button>
        <button onClick={() => showToast('Open camera to create Reel')} className="text-neutral-400 hover:text-white">
          <PlusSquare size={22} />
        </button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'text-white' : 'text-neutral-500'}>
          <User size={22} />
        </button>
      </div>
    </div>
  );
};
