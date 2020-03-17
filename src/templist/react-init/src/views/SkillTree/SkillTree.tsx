import React from 'react'
import './SkillTree.scss'
import { generateSkillRoutes } from '@/router/Routes'

const SkillTree: React.FC = () => {
    return <div className="skill-tree">{generateSkillRoutes()}</div>
}

export default SkillTree
