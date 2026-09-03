export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  role: string;
  tasks: string[];
  technologies: string[];
  category: 'gestion' | 'crm' | 'frameworks' | 'portales' | 'interoperabilidad';
  categoryLabel: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location?: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
    about: string;
    skills: string[];
  };
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

export const cvData: CVData = {
  personal: {
    name: "Marina Sánchez Armengol",
    title: "Consultora TIC & Gestora de Proyectos (PM)",
    email: "msarmengol@gmail.com",
    phone: "+34 678 63 67 47",
    linkedin: "https://www.linkedin.com/in/msarmengol",
    github: "https://github.com/msarmengol-DS",
    location: "Sevilla, España",
    about: "Profesional de la tecnología de la información con más de 30 años de experiencia liderando proyectos complejos de transformación digital, análisis funcional, consultoría TIC y desarrollo de software. Experta en metodologías ágiles y tradicionales, gestión de licitaciones públicas y coordinación de equipos multidisciplinares, con un fuerte enfoque en el sector mutuas, seguridad social y administraciones públicas.",
    skills: [
      "Gestión de Proyectos (PMP®)",
      "Consultoría TIC",
      "Análisis Funcional",
      "Licitaciones Públicas",
      "Transformación Digital",
      "Control de Calidad (QA)",
      "Metodología RUP",
      "Big Data",
      "Integración de ERP (SAP FI)",
      "Interoperabilidad (WIFIS, HL7)"
    ]
  },
  projects: [
    {
      id: "reserva_credito",
      title: "Reserva de Crédito",
      subtitle: "Sistema de gestión presupuestaria y control de ejecución",
      description: "Sistemas de gestión de reserva presupuestaria y control de la ejecución del gasto con integraciones con ERPs del ecosistema interno (facturación, gestión de contratos, gestión de expedientes, gestión contable) y con el sistema externo SICOSS (Sistema de Información Contable de la Seguridad Social).",
      role: "Project Manager (PM) - Liderando el seguimiento del proyecto.",
      category: "gestion",
      categoryLabel: "Gestión Presupuestaria y ERP",
      tasks: [
        "Gestión integral del proyecto.",
        "Gestión activa de la relación con el proveedor de desarrollo.",
        "Aseguramiento funcional de los requisitos del sistema.",
        "Control de calidad exhaustivo de los entregables y del producto final.",
        "Gestión y ejecución de las pruebas de aceptación."
      ],
      technologies: ["Angular", "J2EE", "DB2", "RUP", "GitLab", "Google Workspace", "Monday", "dBeaver", "Postman"]
    },
    {
      id: "gema_crm",
      title: "GEMA. CRM y eMailMarketing",
      subtitle: "Solución CRM SaaS bidireccional",
      description: "Solución CRM SaaS conectada bidireccionalmente con una herramienta de envíos masivos de emails. Liderazgo del proceso de prospección y gestión de la licitación pública.",
      role: "Consultora TIC - Liderando la prospección y gestión de la licitación pública.",
      category: "crm",
      categoryLabel: "CRM y Marketing Digital",
      tasks: [
        "Prospección exhaustiva de mercado para soluciones idóneas.",
        "Preparación técnica de la licitación para la solución SaaS elegida.",
        "Soporte especializado al proceso de licitación y contratación pública.",
        "Gestión del proyecto global de implantación."
      ],
      technologies: ["Efficy CRM", "APSIS Emailing", "Google Workspace", "Monday"]
    },
    {
      id: "aquacloud_abl",
      title: "AQUACloud / ABL",
      subtitle: "Marco de desarrollo para transformación digital",
      description: "Marco de desarrollo corporativo propio para la creación y despliegue de nuevas aplicaciones conforme al plan estratégico de transformación digital de la Mutua.",
      role: "Consultora TIC - Responsable de componentes de negocio gestionados por el marco.",
      category: "frameworks",
      categoryLabel: "Arquitectura y Frameworks",
      tasks: [
        "Establecer protocolos de gobernanza para la gestión de componentes de negocio.",
        "Gestión y alineación del cliente interno de la mutua.",
        "Gestión directa con el proveedor tecnológico externo.",
        "Acompañamiento estratégico en la toma de decisiones sobre el stack tecnológico corporativo."
      ],
      technologies: ["Angular", "J2EE", "DB2", "GitLab", "Swagger", "jBPM / Bonita BPM", "Google Workspace", "Monday"]
    },
    {
      id: "asepeyo_oficina_virtual",
      title: "Asepeyo Oficina Virtual",
      subtitle: "Portal securizado para stakeholders",
      description: "Portal securizado para la relación digital con la Mutua de distintos stakeholders (mutualistas, trabajadores protegidos, colaboradores y proveedores).",
      role: "Analista - Participante en implantación de funcionalidades, rediseño y monitorización.",
      category: "portales",
      categoryLabel: "Portales Web Securizados",
      tasks: [
        "Gestión integral de requisitos funcionales y de negocio.",
        "Diseño y ejecución de pruebas de concepto (PoC) para la validación de nuevas funcionalidades.",
        "Diseño y pruebas de concepto de KPIs y dashboards analíticos para monitoreo del servicio."
      ],
      technologies: ["DB2", "Elasticsearch / Kibana", "Google Analytics", "Tableau", "Google Workspace"]
    },
    {
      id: "afiliacion_recaudacion",
      title: "Sistemas de Afiliación y Recaudación",
      subtitle: "Seguimiento y control de afiliación",
      description: "Sistema de seguimiento y control de la información sobre Afiliación y Recaudación, formando parte del proceso global de transformación digital corporativa.",
      role: "Analista - Participando en la gestión del cambio.",
      category: "gestion",
      categoryLabel: "Gestión Presupuestaria y ERP",
      tasks: [
        "Seguimiento y facilitación de la gestión del cambio cultural y tecnológico para la implantación del proyecto."
      ],
      technologies: ["DB2", "IBM Lotus Notes", "Google Workspace"]
    },
    {
      id: "portal_ciudadano_gsit_oge",
      title: "Portal Ciudadano (GSIT) y Canal Empresa (OGE)",
      subtitle: "Plataformas de tramitación en línea de la Generalitat de Catalunya",
      description: "Sistema de información de la Oficina de Gestió Empresarial (OGE) y la Direcció General d'Atenció Ciutadana i Difusió de la Generalitat de Catalunya. Plataformas transversales de tramitación pública online para ciudadanos y empresas.",
      role: "Consultora TIC - Participación en nuevos desarrollos y tareas de coordinación.",
      category: "portales",
      categoryLabel: "Portales Web Securizados",
      tasks: [
        "Establecer, valorar y acotar el alcance funcional de requerimientos on-demand.",
        "Coordinación de equipos de consultoría técnica e implantación.",
        "Soporte funcional avanzado en la gestión de incidencias críticas.",
        "Toma detallada de requisitos, elaboración de documentos de análisis funcional y control del ciclo de desarrollo para nuevas prestaciones."
      ],
      technologies: ["J2EE", "SQL", "Herramientas Rational (RSA, RTC, RQM)", "SoapUI", "XMLSpy", "Liquid XML"]
    },
    {
      id: "is3_plataforma_interoperabilidad",
      title: "IS3 - Plataforma iSISS.cat",
      subtitle: "Interoperabilidad del Departament de Salut de Catalunya",
      description: "Plataforma de interoperabilidad de datos del Departament de Salut de la Generalitat de Catalunya. Gestión de mensajería y comunicaciones clínicas.",
      role: "Analista Funcional - Responsable de especificaciones funcionales y planes de prueba.",
      category: "interoperabilidad",
      categoryLabel: "Sistemas de Interoperabilidad",
      tasks: [
        "Soporte funcional especializado durante el ciclo de vida de los nuevos evolutivos de la plataforma.",
        "Revisión técnica y documentación exhaustiva de la mensajería de comunicaciones WIFIS 2.0.1.",
        "Responsable de control de calidad y garantía de software (QA) del proyecto."
      ],
      technologies: ["J2EE", "Oracle Database", "Herramientas Rational (RSA, RTC, RQM)", "XMLSpy", "Liquid XML", "Estándar WIFIS", "Estándar de mensajería HL7", "SoapUI"]
    }
  ],
  experience: [
    {
      period: "Nov/2018 - Presente",
      role: "Consultora TIC",
      company: "ASEPEYO (Mutua Colaboradora con la Seguridad Social nº 151)",
      description: "Consultoría estratégica de tecnologías de la información y dirección de proyectos para la mejora de los sistemas de gestión presupuestaria, portales corporativos y procesos de licitación de la entidad."
    },
    {
      period: "Oct/2014 - Oct/2018",
      role: "Consultora de Aplicaciones",
      company: "ViewNext (IBM Group)",
      description: "Consultoría de desarrollo de aplicaciones y análisis de sistemas para importantes clientes en entornos empresariales robustos."
    },
    {
      period: "Sept/2000 - Jul/2014",
      role: "Analista Senior",
      company: "AYESA (anteriormente SADIEL S.A.)",
      description: "Análisis y diseño de sistemas a gran escala en el sector público y privado, liderando especificaciones funcionales y coordinación con equipos de desarrollo."
    },
    {
      period: "Feb/2000 - Sept/2000",
      role: "Consultora TIC",
      company: "Fundación Cavallo",
      description: "Desarrollo de proyectos de consultoría TIC y apoyo tecnológico a organizaciones."
    },
    {
      period: "Jul/1998 - Ene/2000",
      role: "Analista",
      company: "HISTA-INTECH, S.A.",
      description: "Análisis técnico de requerimientos de software y soporte de desarrollo de sistemas."
    },
    {
      period: "Ene/1997 - Jun/1998",
      role: "Analista",
      company: "Binario Consult, S.A.",
      description: "Diseño lógico de bases de datos y especificaciones de software de gestión de negocio."
    },
    {
      period: "Feb/1994 - Dic/1996",
      role: "Consultora de Informática y Telecomunicaciones",
      company: "Ministerio de Economía de Argentina",
      description: "Consultoría especializada en comisiones de Informática y Telecomunicaciones en el marco de los proyectos de las Naciones Unidas 91/010 y 93/040."
    },
    {
      period: "Ene/1992 - Feb/1993",
      role: "Analista",
      company: "ERITEL, S.A.",
      description: "Análisis funcional y especificación de sistemas de comunicaciones y software industrial."
    },
    {
      period: "Mayo/1990 - Dic/1991",
      role: "Analista Programadora",
      company: "ERIA, S.A.",
      description: "Programación avanzada de sistemas, consultas SQL y desarrollo lógico en entornos corporativos."
    },
    {
      period: "Oct/1989 - Abril/1990",
      role: "Analista Programadora",
      company: "Grupo OSBORNE, S.A.",
      description: "Desarrollo de aplicaciones de gestión comercial, bases de datos y reportes de facturación."
    },
    {
      period: "Mayo/1989 - Sep/1989",
      role: "Programadora",
      company: "GADI, S.A. (Agente IBM)",
      description: "Programación en sistemas IBM AS/400 y desarrollo de componentes transaccionales iniciales."
    }
  ],
  education: [
    {
      degree: "Ingeniería Industrial (Hasta 2º año)",
      institution: "Escuela Superior de Ingenieros Industriales de la Universidad de Sevilla",
      location: "Sevilla, España",
      period: "Estudios realizados"
    },
    {
      degree: "Ingeniería Electricista-Electrónica (Hasta 4º año)",
      institution: "Facultad de Ciencias Exactas, Físicas y Naturales de la Universidad Nacional de Córdoba",
      location: "Córdoba, Argentina",
      period: "Estudios realizados"
    },
    {
      degree: "Ingeniería Industrial (Hasta 4º año)",
      institution: "Universidad Tecnológica Nacional, sede Buenos Aires",
      location: "Buenos Aires, Argentina",
      period: "Estudios realizados"
    }
  ],
  certifications: [
    { name: "Curso Big Data (Fundación Paco Puerto)" },
    { name: "Curso superior de Transformación Digital (Deusto Formación / Universidad Internacional de Valencia)" },
    { name: "Máster en Derecho de la Seguridad Social (Universidad de Granada)" },
    { name: "Certificación PMP® (Project Management Professional - PMI)" },
    { name: "SAP FI. C_TFIN52_66. SAP Financial Accounting with SAP ERP 6.0 EHP6" },
    { name: "TOEIC. Certificate in Advanced English. Nivel B2 (MCER)" }
  ],
  languages: [
    { language: "Castellano", level: "Nativo" },
    { language: "Inglés", level: "Nivel intermedio-alto (TOEIC B2)" },
    { language: "Catalán", level: "Nivel medio" }
  ]
};
