/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  Award, 
  BookOpen, 
  Globe, 
  Printer, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  Send, 
  X, 
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  ClipboardCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cvData, Project, Experience } from './cvData';

export default function App() {
  // States for interactive features
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showFullTimeline, setShowFullTimeline] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });

  // Refs for smooth scroll
  const projectsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle clipboard copy
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filter projects based on search query and category pill
  const filteredProjects = useMemo(() => {
    return cvData.projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Project detail toggle
  const toggleProjectExpand = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  // Contact form submission logic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { name: '', email: '', message: '' };
    let hasErrors = false;

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
      hasErrors = true;
    }
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Introduce un correo electrónico válido.';
      hasErrors = true;
    }
    if (!formData.message.trim()) {
      errors.message = 'El mensaje no puede estar vacío.';
      hasErrors = true;
    }

    setFormErrors(errors);

    if (!hasErrors) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setShowContactModal(false);
      }, 3000);
    }
  };

  // Printing utility
  const handlePrint = () => {
    window.print();
  };

  // Categories list derived dynamically with custom titles
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'gestion', label: 'Gestión y ERP' },
    { id: 'crm', label: 'CRM y Marketing' },
    { id: 'frameworks', label: 'Arquitectura y Frameworks' },
    { id: 'portales', label: 'Portales Web' },
    { id: 'interoperabilidad', label: 'Interoperabilidad' }
  ];

  // Divide work history for "Show More" functionality
  const visibleTimeline = showFullTimeline 
    ? cvData.experience 
    : cvData.experience.slice(0, 4);

  return (
    <div id="portfolio-root" className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-950 print:bg-white print:text-black">
      
      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ========================================================== */}
          {/* LEFT COLUMN: Profile and Personal Details (Sticky on Desktop) */}
          {/* ========================================================== */}
          <header id="profile-sidebar" className="lg:col-span-4 lg:sticky lg:top-12 lg:h-fit lg:border-r lg:border-stone-200 lg:pr-12 space-y-8 print:col-span-12 print:relative print:top-0 print:border-none print:pr-0 print:space-y-4">
            
            {/* Top Branding Frame */}
            <div className="space-y-6">
              {/* Initials badge / profile monogram */}
              <div id="monogram-badge" className="flex items-center space-x-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center font-display text-xl font-medium shadow-none print:w-12 print:h-12 print:text-lg"
                >
                  MS
                </motion.div>
                <div className="print:hidden">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200/60">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-stone-500" /> Disponible para Proyectos
                  </span>
                </div>
              </div>

              {/* Title & Name */}
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  id="user-full-name" 
                  className="text-3xl font-normal tracking-tight font-display text-stone-950 print:text-2xl"
                >
                  {cvData.personal.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  id="user-job-title" 
                  className="text-sm uppercase tracking-wider text-stone-500 font-semibold print:text-xs"
                >
                  {cvData.personal.title}
                </motion.p>
              </div>

              {/* Location Tag */}
              <div id="location-badge" className="flex items-center text-xs text-stone-400 space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{cvData.personal.location}</span>
              </div>
            </div>

            {/* About / Abstract Paragraph */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="about-summary" 
              className="text-stone-600 text-sm leading-relaxed border-l border-stone-300 pl-4 print:text-xs print:leading-normal"
            >
              {cvData.personal.about}
            </motion.p>

            {/* Print Friendly & Quick Connect Card */}
            <div id="quick-contact-panel" className="bg-white border border-stone-200 rounded-lg p-5 space-y-4 print:border-none print:p-0 print:bg-transparent">
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest font-display print:hidden">Contacto</h3>
              
              <div className="space-y-3 text-sm">
                
                {/* Email Item */}
                <div id="contact-email-row" className="flex items-center justify-between group">
                  <a 
                    href={`mailto:${cvData.personal.email}`} 
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors duration-150"
                  >
                    <Mail className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                    <span className="font-mono text-xs">{cvData.personal.email}</span>
                  </a>
                  <button 
                    onClick={() => handleCopy(cvData.personal.email, 'email')}
                    className="p-1 text-stone-400 hover:text-stone-600 rounded hover:bg-stone-50 transition-colors duration-100 print:hidden"
                    title="Copiar correo"
                  >
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div id="contact-phone-row" className="flex items-center justify-between group">
                  <a 
                    href={`tel:${cvData.personal.phone.replace(/\s+/g, '')}`} 
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors duration-150"
                  >
                    <Phone className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                    <span className="font-mono text-xs">{cvData.personal.phone}</span>
                  </a>
                  <button 
                    onClick={() => handleCopy(cvData.personal.phone, 'phone')}
                    className="p-1 text-stone-400 hover:text-stone-600 rounded hover:bg-stone-50 transition-colors duration-100 print:hidden"
                    title="Copiar teléfono"
                  >
                    {copiedText === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Social Links */}
                <div id="contact-socials-row" className="flex items-center space-x-4 pt-2 border-t border-stone-100 print:hidden">
                  <a 
                    href={cvData.personal.linkedin} 
                    target="_blank" 
                    rel="referrer noopener" 
                    className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors duration-150"
                  >
                    <Linkedin className="w-4 h-4 text-stone-400" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-300" />
                  </a>
                  <a 
                    href={cvData.personal.github} 
                    target="_blank" 
                    rel="referrer noopener" 
                    className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors duration-150"
                  >
                    <Github className="w-4 h-4 text-stone-400" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Quick Nav & Action Triggers - hidden in print */}
            <div id="sidebar-action-buttons" className="space-y-3 pt-2 print:hidden">
              <button 
                id="btn-trigger-contact"
                onClick={() => setShowContactModal(true)}
                className="w-full py-2.5 px-4 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-150 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar un Mensaje</span>
              </button>

              <button 
                id="btn-trigger-print"
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-medium text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-150 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-400" />
                <span>Imprimir CV / PDF</span>
              </button>
            </div>

            {/* Quick Navigation - Table of Contents */}
            <div id="quick-navigation" className="hidden lg:block space-y-3 pt-4 border-t border-stone-200/60 print:hidden animate-fade-in">
              <h3 className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest font-display">Navegación</h3>
              <nav className="space-y-2">
                {[
                  { name: 'Proyectos Recientes', ref: projectsRef },
                  { name: 'Trayectoria Profesional', ref: timelineRef },
                  { name: 'Estudios y Certificaciones', ref: educationRef }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToRef(item.ref)}
                    className="group flex items-center space-x-2.5 text-xs text-stone-500 hover:text-stone-900 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="w-3.5 h-[1.5px] bg-stone-200 group-hover:w-5 group-hover:bg-stone-900 transition-all duration-200" />
                    <span className="tracking-wide">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Skills Cluster (Sidebar on desktop, collapses elegantly on mobile) */}
            <div id="skills-cloud" className="space-y-3 pt-4">
              <h3 className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest font-display">Competencias</h3>
              <div className="flex flex-wrap gap-1.5">
                {cvData.personal.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs text-stone-600 bg-stone-100 border border-stone-200/50 print:bg-white print:text-black print:border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </header>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: Interactive Work Modules, Projects & Education */}
          {/* ========================================================== */}
          <main id="main-content-area" className="lg:col-span-8 space-y-16 print:col-span-12 print:space-y-10">
            
            {/* -------------------------------------------------------- */}
            {/* PROJECTS SECTION: Filterable modern interactive showcase */}
            {/* -------------------------------------------------------- */}
            <motion.section 
              id="recent-projects-section" 
              ref={projectsRef} 
              className="space-y-8 scroll-mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-normal tracking-tight text-stone-950 uppercase font-display">Proyectos Recientes</h2>
                  </div>
                  <p className="text-stone-500 text-xs">Portafolio minimalista de consultoría y gestión pública.</p>
                </div>

                {/* Projects counter badge */}
                <span className="self-start sm:self-auto px-2 py-1 rounded text-xs font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200/60">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
                </span>
              </div>

              {/* Search & Filter Controls - Hidden in Print */}
              <div id="projects-controls" className="space-y-4 print:hidden">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="text"
                    placeholder="Buscar por tecnología, rol o palabra clave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-all duration-150"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer ${
                        selectedCategory === cat.id 
                          ? 'bg-stone-900 text-white font-medium' 
                          : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid Container */}
              <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <motion.div
                        layout="position"
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 12 }}
                        transition={{ 
                          opacity: { duration: 0.2 },
                          layout: { type: "spring", stiffness: 350, damping: 35 }
                        }}
                        key={project.id}
                        id={`project-${project.id}`}
                        className="bg-white border border-stone-200 rounded-lg p-6 shadow-none hover:border-stone-400 hover:shadow-xs transition-all duration-200 flex flex-col justify-between relative group print:p-4 print:bg-transparent print:border-b print:border-stone-150"
                      >
                        <div className="space-y-4">
                          {/* Header row: Title & Label */}
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-base font-semibold text-stone-900 font-display leading-snug group-hover:text-stone-950 transition-colors duration-150">{project.title}</h3>
                            </div>
                            {project.subtitle && (
                              <p className="text-stone-400 text-xs mt-0.5 italic">{project.subtitle}</p>
                            )}
                          </div>

                          {/* Category Tag */}
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-stone-100 text-stone-500 border border-stone-200/50">
                              {project.categoryLabel}
                            </span>
                          </div>

                          {/* Role Highlight */}
                          <div className="text-xs text-stone-600 font-medium border-l border-stone-200 pl-2.5">
                            <span className="font-semibold block text-[10px] uppercase text-stone-400 tracking-wider">Rol</span>
                            <span className="text-stone-700">{project.role}</span>
                          </div>

                          {/* Base Description */}
                          <p className="text-stone-600 text-xs leading-relaxed">
                            {project.description}
                          </p>

                          {/* Expandable Tareas section */}
                          <div className="space-y-2.5">
                            <button
                              id={`btn-expand-${project.id}`}
                              onClick={() => toggleProjectExpand(project.id)}
                              className="inline-flex items-center text-xs font-semibold text-stone-900 hover:text-stone-600 space-x-1 transition-colors duration-100 cursor-pointer print:hidden"
                            >
                              <span>{expandedProject === project.id ? 'Ocultar tareas' : 'Ver tareas realizadas'}</span>
                              {expandedProject === project.id 
                                ? <ChevronDown className="w-3.5 h-3.5" /> 
                                : <ChevronRight className="w-3.5 h-3.5" />
                              }
                            </button>

                            {/* Render Tareas (Active in Print by default or if expanded) */}
                            <div className={`${expandedProject === project.id ? 'block' : 'hidden'} lg:block print:block`}>
                              <div className="bg-stone-50/70 border border-stone-150 rounded-md p-4 space-y-2 print:bg-transparent print:border-none print:p-0">
                                <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tareas:</h4>
                                <ul className="space-y-1.5">
                                  {project.tasks.map((task, i) => (
                                    <li key={i} className="flex items-start space-x-2 text-[11px] text-stone-600 leading-normal">
                                      <span className="w-1 h-1 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Technologies Tag Cloud */}
                        <div className="pt-4 mt-4 border-t border-stone-100">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/40"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-white border border-dashed border-stone-200 rounded-lg p-12 text-center space-y-3 col-span-2">
                      <Search className="w-8 h-8 text-stone-300 mx-auto" />
                      <p className="text-stone-500 text-xs font-medium">No se encontraron proyectos para tu búsqueda.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                        className="text-xs font-semibold text-stone-900 underline hover:text-stone-600 cursor-pointer"
                      >
                        Restablecer filtros
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </motion.section>

            {/* -------------------------------------------------------- */}
            {/* TIMELINE SECTION: Gorgeous, minimal career tracker */}
            {/* -------------------------------------------------------- */}
            <motion.section 
              id="career-timeline-section" 
              ref={timelineRef} 
              className="space-y-8 scroll-mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              
              {/* Section Header */}
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-4">
                <h2 className="text-lg font-normal tracking-tight text-stone-950 uppercase font-display">Trayectoria Profesional</h2>
              </div>

              {/* Vertical Timeline Container */}
              <motion.div 
                layout="position"
                className="relative border-l border-stone-200 ml-3 pl-6 space-y-8 print:border-l-0 print:ml-0 print:pl-0 print:space-y-4"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleTimeline.map((job, index) => (
                    <motion.div 
                      key={`${job.period}-${job.role}`}
                      layout="position"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative group print:border-b print:border-stone-100 print:pb-3"
                    >
                      
                      {/* Visual node on left - hidden in print */}
                      <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-stone-900 border border-stone-50 group-hover:scale-125 transition-all duration-150 print:hidden" />
                      
                      <div className="space-y-1">
                        {/* Period block */}
                        <span className="font-mono text-xs font-semibold text-stone-400 block tracking-wider print:text-black">
                          {job.period}
                        </span>

                        {/* Job Title */}
                        <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-950 transition-colors duration-150 print:text-sm">
                          {job.role}
                        </h3>

                        {/* Company Name */}
                        <p className="text-xs text-stone-500 font-medium print:text-black">
                          {job.company}
                        </p>

                        {/* Short Description */}
                        {job.description && (
                          <p className="text-xs text-stone-600 leading-relaxed pt-1 max-w-2xl">
                            {job.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Show All Careers Toggle (Hidden in Print) */}
              <div className="text-center pt-2 print:hidden">
                <button
                  id="btn-timeline-toggle"
                  onClick={() => setShowFullTimeline(!showFullTimeline)}
                  className="inline-flex items-center px-4 py-2 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors duration-150 cursor-pointer"
                >
                  <span>{showFullTimeline ? "Ver menos" : `Historial completo (+${cvData.experience.length - 4})`}</span>
                  {showFullTimeline ? <ChevronDown className="w-3.5 h-3.5 ml-1 rotate-180" /> : <ChevronRight className="w-3.5 h-3.5 ml-1" />}
                </button>
              </div>

            </motion.section>

            {/* -------------------------------------------------------- */}
            {/* EDUCATION & CERTIFICATIONS SECTIONS */}
            {/* -------------------------------------------------------- */}
            <motion.div 
              ref={educationRef} 
              className="grid grid-cols-1 md:grid-cols-2 gap-10 scroll-mt-10 print:grid-cols-1 print:gap-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              
              {/* Education Block */}
              <section id="education-sub-section" className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                  <h3 className="text-sm font-semibold tracking-wider text-stone-950 uppercase font-display">Estudios</h3>
                </div>

                <div className="space-y-5">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-xs font-mono text-stone-400 block">{edu.period}</span>
                      <h4 className="text-sm font-semibold text-stone-900">{edu.degree}</h4>
                      <p className="text-xs text-stone-500">{edu.institution}</p>
                      <p className="text-[10px] text-stone-400 italic">{edu.location}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications Block */}
              <section id="certifications-sub-section" className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                  <h3 className="text-sm font-semibold tracking-wider text-stone-950 uppercase font-display">Certificaciones</h3>
                </div>

                <div className="space-y-3">
                  {cvData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start space-x-2 bg-white border border-stone-200 p-3 rounded-md print:border-none print:p-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-stone-800 leading-snug print:text-black">{cert.name}</p>
                        {cert.issuer && <p className="text-[10px] text-stone-400">{cert.issuer}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>

            {/* -------------------------------------------------------- */}
            {/* LANGUAGES SECTION */}
            {/* -------------------------------------------------------- */}
            <motion.section 
              id="languages-section" 
              className="space-y-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <h3 className="text-sm font-semibold tracking-wider text-stone-950 uppercase font-display">Idiomas</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cvData.languages.map((lang, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 p-4 rounded-lg flex items-center justify-between print:border-none print:p-0">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">{lang.language}</h4>
                      <p className="text-[11px] text-stone-500">{lang.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </main>

        </div>
      </div>

      {/* ========================================================== */}
      {/* INTERACTIVE COMPONENT: Contact Slider Modal / Drawer */}
      {/* ========================================================== */}
      <AnimatePresence>
        {showContactModal && (
          <div id="contact-modal" className="fixed inset-0 z-50 flex items-center justify-end font-sans print:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-stone-950"
            />

            {/* Sheet / Slider Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-stone-50 border-l border-stone-200 shadow-xl flex flex-col p-6 overflow-y-auto"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-normal tracking-tight text-stone-950 uppercase font-display">Enviar Mensaje</h3>
                  <p className="text-xs text-stone-500">Contactar directamente con Marina Sánchez</p>
                </div>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="p-1 rounded text-stone-400 hover:text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content / Success state */}
              {formSubmitted ? (
                <div id="form-success-alert" className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </motion.div>
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-stone-900">¡Mensaje Enviado!</h4>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">Gracias por contactar. Marina te responderá a la mayor brevedad posible por correo electrónico.</p>
                  </div>
                </div>
              ) : (
                <form id="contact-inner-form" onSubmit={handleFormSubmit} className="flex-1 flex flex-col space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="form-name" className="text-xs font-semibold text-stone-500">Nombre Completo</label>
                    <input 
                      id="form-name"
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre..."
                    />
                    {formErrors.name && <p className="text-[11px] text-red-600 font-medium">{formErrors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="text-xs font-semibold text-stone-500">Correo Electrónico</label>
                    <input 
                      id="form-email"
                      type="email"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nombre@empresa.com"
                    />
                    {formErrors.email && <p className="text-[11px] text-red-600 font-medium">{formErrors.email}</p>}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label htmlFor="form-message" className="text-xs font-semibold text-stone-500">Mensaje / Propuesta de Proyecto</label>
                    <textarea 
                      id="form-message"
                      rows={5}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe los detalles aquí..."
                    />
                    {formErrors.message && <p className="text-[11px] text-red-600 font-medium">{formErrors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 mt-auto">
                    <button 
                      id="btn-form-submit"
                      type="submit"
                      className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-1.5 transition-colors duration-150 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensaje</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Alternative details inside drawer */}
              <div className="pt-6 border-t border-stone-200 space-y-3 mt-auto">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Otras vías de contacto</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-stone-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{cvData.personal.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-stone-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{cvData.personal.phone}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer credit - Clean and literal */}
      <footer id="portfolio-footer" className="max-w-7xl mx-auto px-6 sm:px-8 py-10 border-t border-stone-200 text-center text-[11px] text-stone-400 space-y-2 print:hidden">
        <p>© 2026 {cvData.personal.name}. Todos los derechos reservados.</p>
        <p>Currículum Vitae interactivo en formato digital y adaptable a dispositivos móviles.</p>
      </footer>

    </div>
  );
}
