export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  niche: string;
  followers: string;
  engagement: string;
  location: string;
  bio: string;
  platforms: string[];
  services: { name: string; price: string }[];
  portfolio: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  budgetRange: string;
  activeCampaigns: number;
  pastCampaigns: number;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  budget: string;
  creatorsNeeded: number;
  creatorsApplied: number;
  deadline: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  category: string;
}

export interface FeedPost {
  id: string;
  type: 'image' | 'video' | 'campaign' | 'milestone';
  author: string;
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: { from: string; text: string; time: string }[];
}

export interface Notification {
  id: string;
  type: 'invite' | 'application' | 'approval' | 'payment' | 'milestone';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar: string;
}

export const creators: Creator[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    username: 'rahulsharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    niche: 'Tech',
    followers: '120K',
    engagement: '6%',
    location: 'Delhi',
    bio: 'Tech reviewer & gadget enthusiast. Bringing you the latest in consumer technology.',
    platforms: ['Instagram', 'YouTube', 'Twitter'],
    services: [
      { name: 'Instagram Reel Promotion', price: '₹10,000' },
      { name: 'YouTube Review', price: '₹25,000' },
      { name: 'Story Promotion', price: '₹3,000' },
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
    ],
  },
  {
    id: '2',
    name: 'Ananya Mehta',
    username: 'ananyamehta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    niche: 'Fashion',
    followers: '80K',
    engagement: '5.5%',
    location: 'Mumbai',
    bio: 'Fashion & lifestyle creator. Curating trends and styling tips for the modern woman.',
    platforms: ['Instagram', 'Pinterest', 'YouTube'],
    services: [
      { name: 'Instagram Reel Promotion', price: '₹8,000' },
      { name: 'Story Promotion', price: '₹2,500' },
      { name: 'Brand Collaboration Post', price: '₹15,000' },
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    ],
  },
  {
    id: '3',
    name: 'Arjun Patel',
    username: 'arjunpatel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    niche: 'Fitness',
    followers: '200K',
    engagement: '7.2%',
    location: 'Bangalore',
    bio: 'Certified fitness trainer & nutrition coach. Transforming lives through health.',
    platforms: ['Instagram', 'YouTube', 'Facebook'],
    services: [
      { name: 'Instagram Reel Promotion', price: '₹12,000' },
      { name: 'YouTube Video Integration', price: '₹30,000' },
      { name: 'Story Promotion', price: '₹4,000' },
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    ],
  },
  {
    id: '4',
    name: 'Priya Desai',
    username: 'priyadesai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    niche: 'Food',
    followers: '150K',
    engagement: '8.1%',
    location: 'Pune',
    bio: 'Home chef & food blogger. Sharing recipes that bring families together.',
    platforms: ['Instagram', 'YouTube'],
    services: [
      { name: 'Recipe Video', price: '₹15,000' },
      { name: 'Story Promotion', price: '₹3,500' },
      { name: 'Brand Mention', price: '₹5,000' },
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    ],
  },
  {
    id: '5',
    name: 'Vikram Singh',
    username: 'vikramsingh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    niche: 'Travel',
    followers: '95K',
    engagement: '4.8%',
    location: 'Jaipur',
    bio: 'Travel photographer exploring India one state at a time.',
    platforms: ['Instagram', 'YouTube', 'Twitter'],
    services: [
      { name: 'Travel Vlog Feature', price: '₹20,000' },
      { name: 'Instagram Post', price: '₹7,000' },
      { name: 'Story Series', price: '₹5,000' },
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
    ],
  },
];

export const brands: Brand[] = [
  {
    id: '1',
    name: 'TechNova',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    industry: 'Technology',
    location: 'Hyderabad',
    budgetRange: '₹1,00,000 – ₹5,00,000',
    activeCampaigns: 3,
    pastCampaigns: 12,
    description: 'Leading consumer electronics brand specializing in smartwatches and wearables.',
  },
  {
    id: '2',
    name: 'FitFuel Nutrition',
    logo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop',
    industry: 'Health & Fitness',
    location: 'Mumbai',
    budgetRange: '₹50,000 – ₹5,00,000',
    activeCampaigns: 2,
    pastCampaigns: 8,
    description: 'Premium protein supplements and nutrition products for fitness enthusiasts.',
  },
  {
    id: '3',
    name: 'GlowSkin',
    logo: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop',
    industry: 'Beauty & Skincare',
    location: 'Delhi',
    budgetRange: '₹75,000 – ₹3,00,000',
    activeCampaigns: 4,
    pastCampaigns: 15,
    description: 'Natural and organic skincare products for radiant, healthy skin.',
  },
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Smartwatch Launch Campaign',
    brandName: 'TechNova',
    brandLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    budget: '₹2,00,000',
    creatorsNeeded: 15,
    creatorsApplied: 8,
    deadline: '10 days',
    description: 'We are launching our latest smartwatch and looking for tech creators to review and promote the product across social media platforms.',
    requirements: ['Must have 50K+ followers', 'Tech or gadget niche', 'High-quality content creation', 'Available for 2-week campaign'],
    deliverables: ['1 Instagram Reel (60 seconds)', '2 Instagram Stories', 'Mention product link in bio'],
    category: 'Tech',
  },
  {
    id: '2',
    title: 'Protein Supplement Promotion',
    brandName: 'FitFuel Nutrition',
    brandLogo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop',
    budget: '₹1,50,000',
    creatorsNeeded: 10,
    creatorsApplied: 5,
    deadline: '15 days',
    description: 'Promote our new whey protein range to fitness enthusiasts. Looking for creators who can showcase product in workout routines.',
    requirements: ['Fitness niche creators', '30K+ followers', 'Authentic content style', 'Must use product genuinely'],
    deliverables: ['1 YouTube Video (5-10 min)', '3 Instagram Stories', '1 Instagram Post'],
    category: 'Fitness',
  },
  {
    id: '3',
    title: 'Skincare Routine Campaign',
    brandName: 'GlowSkin',
    brandLogo: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop',
    budget: '₹3,00,000',
    creatorsNeeded: 20,
    creatorsApplied: 14,
    deadline: '7 days',
    description: 'Share your skincare routine featuring our organic product line. We want authentic, unfiltered reviews.',
    requirements: ['Beauty or lifestyle niche', '25K+ followers', 'Female audience preferred', 'Must follow skincare routine for 2 weeks'],
    deliverables: ['2 Instagram Reels', '5 Instagram Stories (over 2 weeks)', 'Before/after comparison post'],
    category: 'Beauty',
  },
  {
    id: '4',
    title: 'Summer Travel Series',
    brandName: 'TechNova',
    brandLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    budget: '₹1,75,000',
    creatorsNeeded: 8,
    creatorsApplied: 3,
    deadline: '20 days',
    description: 'Feature our smartwatch during travel adventures. Show how it fits into an active, on-the-go lifestyle.',
    requirements: ['Travel or lifestyle niche', '40K+ followers', 'Stunning visual content', 'Willing to travel'],
    deliverables: ['1 YouTube Vlog', '2 Instagram Reels', '4 Instagram Stories'],
    category: 'Travel',
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'image',
    author: 'Rahul Sharma',
    username: 'rahulsharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '2 hours ago',
    content: 'Just finished reviewing the TechNova Smartwatch Pro! Amazing battery life and the health tracking features are next level. Full review on my channel 🔗 #TechReview #Smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    likes: 2340,
    comments: 187,
    shares: 45,
  },
  {
    id: '2',
    type: 'campaign',
    author: 'FitFuel Nutrition',
    username: 'fitfuel',
    avatar: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop',
    timestamp: '4 hours ago',
    content: '🚀 New Campaign Alert! We\'re looking for 10 fitness creators to promote our new protein range. Budget: ₹1,50,000. Apply now on CreatorHub!',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    likes: 892,
    comments: 64,
    shares: 128,
  },
  {
    id: '3',
    type: 'image',
    author: 'Ananya Mehta',
    username: 'ananyamehta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    timestamp: '6 hours ago',
    content: 'Loved collaborating with GlowSkin on this skincare routine! Their organic products are incredible ✨ Swipe to see my morning routine #Skincare #GlowSkin',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop',
    likes: 3120,
    comments: 234,
    shares: 89,
  },
  {
    id: '4',
    type: 'milestone',
    author: 'Arjun Patel',
    username: 'arjunpatel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    timestamp: '8 hours ago',
    content: '🎉 Just hit 200K followers! Thank you for all the love and support. Excited for what\'s coming next! #Milestone #200K',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    likes: 5670,
    comments: 432,
    shares: 156,
  },
  {
    id: '5',
    type: 'image',
    author: 'Priya Desai',
    username: 'priyadesai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timestamp: '12 hours ago',
    content: 'My butter chicken recipe video just crossed 1M views! Can\'t believe the love 🧡 Recipe link in bio. #FoodBlogger #IndianCuisine',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    likes: 4230,
    comments: 312,
    shares: 201,
  },
  {
    id: '6',
    type: 'campaign',
    author: 'GlowSkin',
    username: 'glowskin',
    avatar: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop',
    timestamp: '1 day ago',
    content: '✨ Calling all beauty creators! Our Skincare Routine Campaign is live. Budget: ₹3,00,000 for 20 creators. Share your authentic skincare journey with us.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600&h=400&fit=crop',
    likes: 1560,
    comments: 98,
    shares: 234,
  },
];

export const conversations: Message[] = [
  {
    id: '1',
    sender: 'TechNova',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    lastMessage: 'Great! Let\'s finalize the campaign details.',
    time: '2 min ago',
    unread: 2,
    messages: [
      { from: 'TechNova', text: 'Hi! We loved your tech review content.', time: '10:00 AM' },
      { from: 'You', text: 'Thank you! I\'d love to collaborate.', time: '10:05 AM' },
      { from: 'TechNova', text: 'We have a smartwatch launch coming up. Interested?', time: '10:10 AM' },
      { from: 'You', text: 'Absolutely! What are the deliverables?', time: '10:15 AM' },
      { from: 'TechNova', text: 'Great! Let\'s finalize the campaign details.', time: '10:20 AM' },
    ],
  },
  {
    id: '2',
    sender: 'Ananya Mehta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the collaboration opportunity!',
    time: '1 hour ago',
    unread: 0,
    messages: [
      { from: 'You', text: 'Hey Ananya! Loved your fashion content.', time: '9:00 AM' },
      { from: 'Ananya Mehta', text: 'Thanks for the collaboration opportunity!', time: '9:30 AM' },
    ],
  },
  {
    id: '3',
    sender: 'FitFuel Nutrition',
    avatar: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop',
    lastMessage: 'Your application has been approved!',
    time: '3 hours ago',
    unread: 1,
    messages: [
      { from: 'FitFuel Nutrition', text: 'Your application for our protein campaign has been received.', time: '8:00 AM' },
      { from: 'FitFuel Nutrition', text: 'Your application has been approved!', time: '11:00 AM' },
    ],
  },
];

export const notifications: Notification[] = [
  { id: '1', type: 'invite', title: 'Campaign Invitation', description: 'TechNova invited you to their Smartwatch Launch campaign.', time: '5 min ago', read: false, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop' },
  { id: '2', type: 'application', title: 'New Application', description: 'Arjun Patel applied to your Protein Supplement campaign.', time: '1 hour ago', read: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { id: '3', type: 'approval', title: 'Campaign Approved', description: 'Your application for Skincare Routine Campaign was approved!', time: '2 hours ago', read: true, avatar: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop' },
  { id: '4', type: 'payment', title: 'Payment Received', description: 'You received ₹25,000 for YouTube Review completion.', time: '1 day ago', read: true, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop' },
  { id: '5', type: 'milestone', title: 'Milestone Achieved', description: 'Congratulations! You completed 10 campaigns on CreatorHub.', time: '2 days ago', read: true, avatar: '' },
  { id: '6', type: 'invite', title: 'Campaign Invitation', description: 'GlowSkin invited you to their Summer Glow campaign.', time: '3 days ago', read: true, avatar: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop' },
];
