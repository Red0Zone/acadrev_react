"use client"
import { motion } from "framer-motion"
import { Building2, GraduationCap, Settings, MessageSquare, Users, BarChart3 } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
}

// Card data with icons
const navCards = [
  { 
    id: 1, 
    icon: <Building2 className="w-6 h-6" />, 
    title: "University", 
    subtitle: "الجامعات", 
    color: "from-blue-500 to-cyan-400" 
  },
  { 
    id: 2, 
    icon: <GraduationCap className="w-6 h-6" />, 
    title: "College", 
    subtitle: "الكليات", 
    color: "from-purple-500 to-pink-500" 
  },
  { 
    id: 3, 
    icon: <Settings className="w-6 h-6" />, 
    title: "Settings", 
    subtitle: "الإعدادات", 
    color: "from-amber-500 to-orange-500" 
  },
  { 
    id: 4, 
    icon: <MessageSquare className="w-6 h-6" />, 
    title: "Messages", 
    subtitle: "الرسائل", 
    color: "from-green-500 to-emerald-500" 
  },
  { 
    id: 5, 
    icon: <Users className="w-6 h-6" />, 
    title: "Users", 
    subtitle: "المستخدمون", 
    color: "from-violet-500 to-indigo-500" 
  },
  { 
    id: 6, 
    icon: <BarChart3 className="w-6 h-6" />, 
    title: "Reports", 
    subtitle: "التقارير", 
    color: "from-rose-500 to-red-500" 
  },
]

function IconGrid({ userLevel = 1 }) {
  // Filter visible cards based on user level
  const visibleNavCards = navCards.filter(() => {
    // This logic should eventually match your DB query logic
    // For now, show all cards
    return true
  })

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {visibleNavCards.map((card) => (
        <motion.div key={card.id} variants={itemVariants}>
          <DashboardCard 
            icon={card.icon} 
            title={card.title} 
            subtitle={card.subtitle} 
            color={card.color} 
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default IconGrid

