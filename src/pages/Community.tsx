import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Image, Send, X, Hash, Users, TrendingUp } from 'lucide-react';
import { Post, Comment } from '../types';
import { communityUsers, initialPosts, topics } from '../data/community';
import { useAppStore } from '../store/appStore';

export function Community() {
  const { user } = useAppStore();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'feed' | 'topics' | 'users'>('feed');

  const getUserById = (userId: string) => communityUsers.find(u => u.id === userId);

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, likes: p.likes + (newLiked.has(postId) ? 1 : -1) }
        : p
    ));
  };

  const handleSave = (postId: string) => {
    const newSaved = new Set(savedPosts);
    if (newSaved.has(postId)) {
      newSaved.delete(postId);
    } else {
      newSaved.add(postId);
    }
    setSavedPosts(newSaved);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      userId: 'current-user',
      content: commentText,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, comments: [...p.comments, newComment] }
        : p
    ));
    setCommentText('');
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      userId: 'current-user',
      content: newPostContent,
      images: newPostImage ? [newPostImage] : [],
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      tags: [],
      type: 'tip'
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage('');
    setShowPostModal(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getPostTypeIcon = (type?: string) => {
    switch (type) {
      case 'workout': return '💪';
      case 'meal': return '🥗';
      case 'progress': return '📸';
      case 'tip': return '💡';
      default: return '📝';
    }
  };

  const getPostTypeName = (type?: string) => {
    switch (type) {
      case 'workout': return '训练动态';
      case 'meal': return '饮食分享';
      case 'progress': return '身材变化';
      case 'tip': return '健身心得';
      default: return '动态';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-healthy-50 pb-28">
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="px-4 pt-14 pb-3">
          <h1 className="text-xl font-bold text-gray-800 mb-3">社区</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'feed'
                  ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              🔥 推荐
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'topics'
                  ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Hash className="inline w-4 h-4 mr-1" />话题
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Users className="inline w-4 h-4 mr-1" />达人
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'feed' && (
        <div className="px-4 py-4 space-y-4">
          <button
            onClick={() => setShowPostModal(true)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-500 font-bold">{user.name[0]}</span>
            </div>
            <span className="text-gray-400 flex-1 text-left">分享你的健身动态...</span>
            <div className="flex gap-1">
              <Image className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {posts.map((post) => {
            const author = getUserById(post.userId);
            const isLiked = likedPosts.has(post.id);
            const isSaved = savedPosts.has(post.id);
            const showFullComments = activePostId === post.id;
            const displayComments = showFullComments ? post.comments : post.comments.slice(0, 2);

            return (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={author?.avatar || user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                        alt={author?.name || user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {post.userId === 'current-user' ? user.name : author?.name}
                          </span>
                          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
                            {getPostTypeIcon(post.type)} {getPostTypeName(post.type)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{formatTime(post.createdAt)}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <p className="text-gray-800 mb-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.images && post.images.length > 0 && (
                    <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {post.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`post-image-${index}`}
                          className={`w-full rounded-xl object-cover ${post.images!.length === 1 ? 'max-h-80' : 'h-40'}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors"
                    >
                      <Heart className={`w-5 h-5 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setActivePostId(showFullComments ? null : post.id)}
                      className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.comments.length}</span>
                    </button>
                    <button
                      onClick={() => handleSave(post.id)}
                      className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 transition-all ${isSaved ? 'text-primary-500 fill-primary-500' : 'text-gray-400'}`} />
                    </button>
                    <button className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors ml-auto">
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {showFullComments && (
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <h4 className="font-medium text-sm text-gray-600 mb-3">
                      评论 ({post.comments.length})
                    </h4>
                    {post.comments.length > 0 ? (
                      <div className="space-y-3 mb-3">
                        {displayComments.map((comment) => {
                          const commenter = getUserById(comment.userId);
                          return (
                            <div key={comment.id} className="flex gap-2">
                              <img
                                src={comment.userId === 'current-user' ? (user.avatar || `https://ui-avatars.com/api/?name=${user.name}`) : (commenter?.avatar || '')}
                                alt={commenter?.name}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1 bg-white rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-gray-800">
                                    {comment.userId === 'current-user' ? user.name : commenter?.name}
                                  </span>
                                  <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 text-center py-3 mb-3">还没有评论，快来抢沙发吧！</p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="写评论..."
                        className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-primary-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-primary-600 transition-colors"
                      >
                        发送
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="px-4 py-4 space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              热门话题
            </h3>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div key={topic.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center text-sm font-bold text-primary-600">
                    {index + 1}
                  </div>
                  <div className="text-2xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">#{topic.title}</h4>
                    <p className="text-xs text-gray-500">{topic.posts.toLocaleString()} 条动态</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">🔥 热门标签</h3>
            <div className="flex flex-wrap gap-2">
              {['减脂', '增肌', '晨跑', '瑜伽', '健身餐', '蛋白粉', '跑步机', '哑铃', '马甲线', '八块腹肌', '体脂率', '基础代谢', 'HIIT', '力量训练', '有氧运动'].map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="px-4 py-4 space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">🏆 健身达人</h3>
            <div className="space-y-4">
              {communityUsers.map((communityUser) => (
                <div key={communityUser.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                  <img
                    src={communityUser.avatar}
                    alt={communityUser.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{communityUser.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{communityUser.bio}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>👥 {communityUser.followers?.toLocaleString()} 粉丝</span>
                      <span>🫂 {communityUser.following} 关注</span>
                    </div>
                  </div>
                  <button className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors">
                    关注
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowPostModal(false)}>
          <div 
            className="bg-white w-full max-h-[80vh] rounded-t-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <button
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="font-bold text-gray-800">发布动态</h2>
              <button
                onClick={handleCreatePost}
                className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
                disabled={!newPostContent.trim()}
              >
                发布
              </button>
            </div>
            <div className="p-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="分享你的健身故事、饮食心得或训练成果..."
                className="w-full h-40 resize-none focus:outline-none text-gray-800 text-base"
              />
              <input
                type="text"
                value={newPostImage}
                onChange={(e) => setNewPostImage(e.target.value)}
                placeholder="图片URL（可选）"
                className="w-full mt-2 px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex items-center gap-2 mt-4">
                <button className="flex items-center gap-1 text-sm text-gray-600 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Image className="w-4 h-4" />
                  <span>添加图片</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Hash className="w-4 h-4" />
                  <span>添加话题</span>
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>{newPostContent.length}/500</span>
                <span>支持图文发布</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl shadow-elevated flex items-center justify-center text-white hover:shadow-xl transition-all z-40 active:scale-95"
      >
        <Send className="w-6 h-6" />
      </button>
    </div>
  );
}