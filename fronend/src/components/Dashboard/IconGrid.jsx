"use client"
import { motion } from "framer-motion"
  import { Building2, Landmark, BookOpen, Users, BarChart3, University } from "lucide-react"
import { DashboardCard } from "./dashboard-card"
import { useState } from "react"

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 15
    } 
  },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
}

// Card data with enhanced metadata
const navCards = [
  { 
    id: 1, 
    icon: <University className="w-6 h-6" />, 
    title: "University", 
    subtitle: "الجامعات",
    color: "from-blue-500 to-blue-700",
    stats: { count: 12, label: "universities" },
    description: "Manage university profiles and accreditation status"
  },
  { 
    id: 2, 
    icon: <Building2 className="w-6 h-6" />, 
    title: "College", 
    subtitle: "الكليات",
    color: "from-purple-500 to-purple-700",
    stats: { count: 48, label: "colleges" },
    description: "Oversee college structures and academic units"
  },
  { 
    id: 3, 
    icon: <Landmark className="w-6 h-6" />, 
    title: "Department", 
    subtitle: "الاقسام",
    color: "from-green-500 to-green-700",
    stats: { count: 126, label: "departments" },
    description: "Monitor departmental performance and metrics"
  },
  { 
    id: 4, 
    icon: <BookOpen className="w-6 h-6" />, 
    title: "Program", 
    subtitle: "البرامج",
    color: "from-amber-500 to-amber-700",
    stats: { count: 284, label: "programs" },
    description: "Review academic programs and curriculum structures"
  },
  { 
    id: 5, 
    icon: <Users className="w-6 h-6" />, 
    title: "Users", 
    subtitle: "المستخدمون",
    color: "from-red-500 to-red-700",
    stats: { count: 1840, label: "active users" },
    description: "Manage user accounts and access permissions"
  },
  { 
    id: 6, 
    icon: <BarChart3 className="w-6 h-6" />, 
    title: "Reports", 
    subtitle: "التقارير",
    color: "from-cyan-500 to-cyan-700",
    stats: { count: 53, label: "reports" },
    description: "Generate analytics and assessment reports"
  },
]

function IconGrid({ userLevel = 1 }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Filter visible cards based on user level
  const visibleNavCards = navCards.filter(() => {
    // This logic should eventually match your DB query logic
    // For now, show all cards
    return true
  })

  return (
    <div className="py-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Academic Management</h2>
        <p className="text-gray-600">Select a module to access its features and data</p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {visibleNavCards.map((card) => (
          <motion.div 
            key={card.id} 
            variants={itemVariants}
            whileHover="hover"
            animate={hoveredCard === card.id ? "hover" : "show"}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative"
          >
            <DashboardCard 
              icon={card.icon} 
              title={card.title} 
              subtitle={card.subtitle}
              color={card.color}
              stats={card.stats}
              description={card.description}
              isActive={hoveredCard === card.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default IconGrid

