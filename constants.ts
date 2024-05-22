import { Code, ImageIcon, MessageSquare, Mic, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Chat Conversation',
    sublabel: 'Chat with GPT',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    sublabel: 'text is dummy which will Trello',
    icon: Music,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    sublabel: 'Generate beautiful AI Images',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    sublabel: 'text is dummy which will Trello',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    sublabel: 'Generate Code snippets',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
  {
    label: 'Transcription',
    sublabel: 'Convert your Voice to Text',
    icon: Mic,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/voice',
  },
];