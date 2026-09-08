import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Sparkles, 
  Activity, 
  Flame, 
  Cpu, 
  Zap, 
  Clock, 
  Dna, 
  Layers, 
  Award, 
  ExternalLink, 
  PlayCircle, 
  ShieldCheck, 
  Heart, 
  BookOpen, 
  CheckCircle2, 
  Sliders, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Share2,
  Globe,
  Languages
} from 'lucide-react';

export default function HubermanMitochondriaMasterclass() {
  const [lang, setLang] = useState('en'); // 'en' | 'es' | 'he'
  const [activeChapter, setActiveChapter] = useState(0);
  const [cellState, setCellState] = useState('zone2'); // 'zone2', 'fasting', 'intense', 'cancer'

  // Load X/Twitter script dynamically if needed for tweet embed
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  const content = {
    en: {
      dir: 'ltr',
      headerBadge: 'Page 32 • Huberman Lab Special Feature',
      expertBadge: 'Dr. Jared Rutter (@rutterlab)',
      dateBadge: 'Released Sept 7, 2026',
      title: 'How Mitochondria Control Your Metabolism',
      subtitle: 'A comprehensive breakdown of Dr. Jared Rutter’s landmark interview with Dr. Andrew Huberman. Discover how mitochondria act as cellular command centers—sensing nutrient availability through the Mitochondrial Pyruvate Carrier (MPC1/2), directing energy vs. growth cell fates, and dictating metabolic health in aging, exercise, and cancer.',
      viewOnX: 'View on X',
      tweetContent: 'The new Huberman Lab episode is out: How Mitochondria Control Your Metabolism | Dr. Jared Rutter (@rutterlab)\n\n0:00 Jared Rutter\n2:29 Metabolism, Cells; Aging\n8:36 Mitochondria, Origin & Cell Complexity\n13:07 Sponsors: Joovv & BetterHelp\n15:16 Mitochondria Genome, Inheritance…',
      insightsTitle: '3 Revolutionary Insights from this Episode',
      insights: [
        {
          title: '1. Mitochondria Are Cellular Decision Makers',
          text: 'They don’t just supply energy on demand. Mitochondria constantly evaluate cell nutrients and decide whether a cell can safely divide or must stay in repair mode.'
        },
        {
          title: '2. MPC1 & MPC2 are the Master Pyruvate Gates',
          text: 'Discovered by Dr. Rutter’s team, the Mitochondrial Pyruvate Carrier (MPC) controls whether pyruvate is burned for 36 ATP or diverted to cell building blocks or lactate.'
        },
        {
          title: '3. Zone 2 Keeps MPC Operational & Prevents Disease',
          text: 'Chronic high blood sugar and sedentary living impair MPC flux. Zone 2 exercise maintains high MPC density and mitochondrial biogenesis.'
        }
      ],
      simulatorTitle: 'The Cell Fate Matrix: Pyruvate & MPC Control',
      simulatorSub: 'Select a physiological state to simulate how mitochondria reroute carbon flux, ATP yield, and cell identity:',
      mpcLabel: 'MPC1 / MPC2 Gate Status',
      pyruvateLabel: 'Pyruvate Destination',
      atpLabel: 'ATP Yield Efficiency',
      lactateLabel: 'Lactate Steady State',
      goalLabel: 'Primary Cellular Goal & Mechanism:',
      chapterSectionTitle: 'Episode Timestamps & In-Depth Chapter Breakdown',
      chapterSectionSub: 'Click any chapter below to explore the scientific mechanics discussed by Dr. Jared Rutter & Andrew Huberman:',
      chapterBadge: '16 Timestamps Cataloged',
      summaryTitle: 'Scientific Summary & Takeaway',
      prevChapter: '← Previous Chapter',
      nextChapter: 'Next Chapter →',
      editorialTitle: 'Optimus Magazine Editorial Take: Zone 2 Application',
      editorialSub: "How Dr. Rutter's Research Validates Ishai's Bioenergetic Protocol",
      editorialPillars: [
        { title: '1. Maintain High MPC Density', text: 'Training consistently in Zone 2 upregulates MPC1 and MPC2 expression, allowing high rates of aerobic pyruvate oxidation without cytosolic lactate overflow.' },
        { title: '2. Prevent Metabolic Rigidity', text: 'Intermittent fasting coupled with low-lactate Zone 2 running keeps cellular fuel-switching dynamic, protecting against heart failure and insulin resistance.' },
        { title: '3. Longevity & Autophagy', text: 'Mitochondria regularly challenged with aerobic demand maintain mtDNA integrity, preventing the metabolic mutations that drive age-related decline.' }
      ]
    },
    es: {
      dir: 'ltr',
      headerBadge: 'Página 32 • Reportaje Especial Huberman Lab',
      expertBadge: 'Dr. Jared Rutter (@rutterlab)',
      dateBadge: 'Publicado 7 de Septiembre, 2026',
      title: 'Cómo las Mitocondrias Controlan tu Metabolismo',
      subtitle: 'Un desglose exhaustivo de la entrevista magistral del Dr. Jared Rutter con el Dr. Andrew Huberman. Descubre cómo las mitocondrias actúan como centros de mando celulares: detectando la disponibilidad de nutrientes a través del Transportador de Piruvato Mitocondrial (MPC1/2), dirigiendo el destino celular entre energía y crecimiento, y dictando la salud metabólica en el envejecimiento, el ejercicio y el cáncer.',
      viewOnX: 'Ver en X',
      tweetContent: 'Nuevo episodio de Huberman Lab: Cómo las mitocondrias controlan tu metabolismo | Dr. Jared Rutter (@rutterlab)\n\n0:00 Jared Rutter\n2:29 Metabolismo, Células y Envejecimiento\n8:36 Mitocondrias, Origen y Complejidad Celular\n13:07 Patrocinadores: Joovv y BetterHelp\n15:16 Genoma Mitocondrial, Herencia…',
      insightsTitle: '3 Descubrimientos Revolucionarios de este Episodio',
      insights: [
        {
          title: '1. Las Mitocondrias son Tomadoras de Decisiones Celulares',
          text: 'No solo entregan energía a demanda. Las mitocondrias evalúan constantemente los nutrientes y deciden si la célula puede dividirse con seguridad o debe permanecer en modo reparación.'
        },
        {
          title: '2. MPC1 y MPC2 son los Portones Principales del Piruvato',
          text: 'Descubierto por el equipo del Dr. Rutter, el Transportador de Piruvato Mitocondrial (MPC) controla si el piruvato se quema para obtener 36 ATP o se desvía a bloques celulares o lactato.'
        },
        {
          title: '3. La Zona 2 Mantiene Activo el MPC y Previene Enfermedades',
          text: 'El azúcar alto crónico y el sedentarismo deterioran el flujo del MPC. El ejercicio en Zona 2 mantiene una alta densidad de MPC y fomenta la biogénesis mitocondrial.'
        }
      ],
      simulatorTitle: 'Matriz de Destino Celular: Control de Piruvato y MPC',
      simulatorSub: 'Selecciona un estado fisiológico para simular cómo las mitocondrias reorientan el flujo de carbono, el rendimiento de ATP y la identidad celular:',
      mpcLabel: 'Estado de Puerta MPC1 / MPC2',
      pyruvateLabel: 'Destino del Piruvato',
      atpLabel: 'Eficiencia de Rendimiento ATP',
      lactateLabel: 'Estado de Equilibrio del Lactato',
      goalLabel: 'Objetivo Celular Principal y Mecanismo:',
      chapterSectionTitle: 'Marcas de Tiempo del Episodio y Desglose de Capítulos',
      chapterSectionSub: 'Haz clic en cualquier capítulo para explorar los mecanismos científicos explicados por los Doctores Jared Rutter y Andrew Huberman:',
      chapterBadge: '16 Marcas de Tiempo Catalogadas',
      summaryTitle: 'Resumen Científico y Conclusión Clave',
      prevChapter: '← Capítulo Anterior',
      nextChapter: 'Siguiente Capítulo →',
      editorialTitle: 'Visión Editorial de Optimus Magazine: Aplicación en Zona 2',
      editorialSub: 'Cómo la investigación del Dr. Rutter valida el protocolo bioenergético de Ishai',
      editorialPillars: [
        { title: '1. Mantener Alta Densidad de MPC', text: 'Entrenar constantemente en Zona 2 aumenta la expresión de MPC1 y MPC2, permitiendo altas tasas de oxidación aeróbica de piruvato sin desbordamiento de lactato citosólico.' },
        { title: '2. Prevenir la Rigidez Metabólica', text: 'El ayuno intermitente combinado con carreras de Zona 2 en bajo lactato mantiene dinámico el cambio de combustible celular, protegiendo contra insuficiencia cardíaca y resistencia a la insulina.' },
        { title: '3. Longevidad y Autofagia', text: 'Las mitocondrias desafiadas regularmente con demanda aeróbica conservan la integridad de su mtDNA, previniendo mutaciones metabólicas que aceleran el envejecimiento.' }
      ]
    },
    he: {
      dir: 'rtl',
      headerBadge: 'עמוד 32 • כתבת מיוחדת פודקאסט הברמן',
      expertBadge: 'ד״ר ג׳ארד ראטר (@rutterlab)',
      dateBadge: 'פורסם ב-7 בספטמבר, 2026',
      title: 'כיצד המיטוכונדריה שולטת במטבוליזם שלך',
      subtitle: 'סקירה מעמיקה של ראיון המופת בין ד״ר ג׳ארד ראטר לד״ר אנדרו הברמן. גלה כיצד המיטוכונדריה משמשת כמרכז פיקוד תאי—חושת את זמינות הנוטריאנטים דרך נשא הפירובט המיטוכונדריאלי (MPC1/2), מנתבת את גורל התא בין ייצור אנרגיה לגדילה, וקובעת את הבריאות המטבולית בהזדקנות, באימונים ובמחלות.',
      viewOnX: 'צפה ב-X',
      tweetContent: 'הפרק החדש של פודקאסט הברמן בחוץ: כיצד המיטוכונדריה שולטת במטבוליזם שלך | ד״ר ג׳ארד ראטר (@rutterlab)\n\n0:00 ג׳ארד ראטר\n2:29 מטבוליזם, תאים והזדקנות\n8:36 מיטוכונדריה, מקור ומורכבות התא\n13:07 חסויות: Joovv & BetterHelp\n15:16 גנום המיטוכונדריה, תורשה…',
      insightsTitle: '3 תובנות מהפכניות מפרק זה',
      insights: [
        {
          title: '1. המיטוכונדריה היא מקבלת ההחלטות התאית',
          text: 'היא אינה רק מספקת אנרגיה לפי דרישה. המיטוכונדריה מעריכה באופן רציף את הזמינות התזונתית ומחליטה אם התא יכול להתחלק בבטחה או חייב להישאר במצב תיקון.'
        },
        {
          title: '2. MPC1 ו-MPC2 הם שערי הפירובט המרכזיים',
          text: 'תגלית של מעבדת ד״ר ראטר: נשא הפירובט המיטוכונדריאלי (MPC) קובע אם הפירובט יישרף לקבלת 36 ATP או ינותב לאבני בניין תאיות או ללקטט.'
        },
        {
          title: '3. אימון בזון 2 שומר על תפקוד ה-MPC ומונע מחלות',
          text: 'סוכר גבוה כרוני ואורח חיים יושבני פוגעים בזרימת ה-MPC. אימון בזון 2 שומר על צפיפות MPC גבוהה ועל ביוגנזה מיטוכונדריאלית.'
        }
      ],
      simulatorTitle: 'מטריצת גורל התא: שליטת הפירובט ו-MPC',
      simulatorSub: 'בחר מצב פיזיולוגי כדי לסמלץ כיצד המיטוכונדריה מנתבת מחדש את זרימת הפחמן, תפוקת ה-ATP וזהות התא:',
      mpcLabel: 'סטטוס שער MPC1 / MPC2',
      pyruvateLabel: 'יעד הפירובט',
      atpLabel: 'יעילות תפוקת ATP',
      lactateLabel: 'רמת לקטט במצב יציב',
      goalLabel: 'מטרה ומנגנון תאי מרכזי:',
      chapterSectionTitle: 'חלקוֹת זמן של הפרק ופירוק מעמיק לפי פרקים',
      chapterSectionSub: 'לחץ על כל פרק למטה כדי לחקור את המנגנונים המדעיים שהוצגו על ידי ד״ר ג׳ארד ראטר וד״ר אנדרו הברמן:',
      chapterBadge: '16 חלקות זמן מפורטות',
      summaryTitle: 'סיכום מדעי ותובנה מרכזית',
      prevChapter: '→ הפרק הקודם',
      nextChapter: 'הפרק הבא ←',
      editorialTitle: 'זווית המערכת של אופטימוס מגזין: יישום בזון 2',
      editorialSub: 'כיצד המחקר של ד״ר ראטר מאשש את הפרוטוקול הביואנרגטי של ישי',
      editorialPillars: [
        { title: '1. שמירה על צפיפות MPC גבוהה', text: 'אימון עקבי בזון 2 מעלה את הביטוי של MPC1 ו-MPC2, מה שמאפשר קצב גבוה של חמצון פירובט אירובי ללא הצפה של לקטט בציטוזול.' },
        { title: '2. מניעת נוקשות מטבולית', text: 'צום לסירוגין בשילוב ריצות זון 2 ברמת לקטט נמוכה שומר על גמישות מעבר הדלקים התאיים ומגן מפני אי-ספיקת לב ועמידות לאינסולין.' },
        { title: '3. אריכות ימים ואוטופגיה', text: 'מיטוכונדריות המאותגרות באופן סדיר בדרישה אירובית שומרות על שלמות ה-mtDNA, מה שמונע מוטציות מטבוליות המאיצות הזדקנות.' }
      ]
    }
  };

  const chaptersData = {
    en: [
      { time: "00:00", title: "Jared Rutter Intro & Lab Overview", cat: "Intro", summary: "Dr. Andrew Huberman introduces Dr. Jared Rutter, Professor of Biochemistry at the University of Utah & HHMI Investigator, renowned for discoveries in mitochondrial metabolism." },
      { time: "02:29", title: "Metabolism, Cells & Aging", cat: "Fundamentals", summary: "Metabolism is far more than counting calories; it is the sum of chemical transformations within cells that dictates cellular identity and biological aging." },
      { time: "08:36", title: "Mitochondria Origin & Complexity", cat: "Evolution", summary: "Mitochondria originated ~1.5 billion years ago via endosymbiosis (bacterium inside archaeal host), unlocking energy density for multicellular life." },
      { time: "15:16", title: "Mitochondrial Genome & Inheritance", cat: "Genetics", summary: "Mitochondria retain their own circular DNA (mtDNA) encoding 13 core respiratory complex proteins, strictly inherited through maternal lineage." },
      { time: "18:18", title: "Spatial Distribution & Tissue Specificity", cat: "Cell Biology", summary: "Mitochondria form dynamic networks wrapped around myofibrils in muscle, axons in neurons, and brown fat for thermogenesis." },
      { time: "25:59", title: "Nutrient Energy, Hormones & Fat Cells", cat: "Endocrinology", summary: "Fat cells sense systemic hormones (insulin, glucagon, epinephrine) to regulate mitochondrial lipid oxidation vs storage." },
      { time: "31:13", title: "Glucose, ATP & Pyruvate (MPC1/MPC2)", cat: "Bioenergetics", summary: "The Mitochondrial Pyruvate Carrier (MPC1/MPC2) acts as the crucial bottleneck determining whether pyruvate is burned for ATP or converted into cytosolic building blocks." },
      { time: "36:41", title: "Cell Choice: Energy vs. Growth (Cancer & Viruses)", cat: "Cell Fate", summary: "Cells face a fundamental fork: generate maximum ATP for maintenance OR divert carbon skeletons to synthesize lipids and nucleic acids for cell division." },
      { time: "48:36", title: "Microbiome & Host Crosstalk", cat: "Metabolomics", summary: "Gut microbe-derived short-chain fatty acids (acetate, butyrate) directly fuel host mitochondrial respiration and gene transcription." },
      { time: "51:44", title: "Discovery of MPC1 & MPC2", cat: "Breakthrough", summary: "Dr. Rutter's lab identified the genes encoding MPC1 & MPC2, solving a 40-year biochemical mystery and unlocking targets for metabolic diseases." },
      { time: "59:42", title: "Resource Sensing: Fasting & Glucagon", cat: "Physiology", summary: "During fasting, glucagon signals mitochondria to shift substrate preference from glucose to fatty acids and ketone bodies." },
      { time: "1:07:03", title: "MPC & Heart Failure Pathophysiology", cat: "Cardiology", summary: "In heart failure, the myocardium loses metabolic flexibility. Impaired MPC starves the heart of efficient pyruvate oxidation." },
      { time: "1:13:24", title: "Cell Size vs. Fuel Balance & Identity", cat: "Cell Health", summary: "Disrupting mitochondrial fuel balance alters chromatin remodeling and epigenetic state, changing cell identity." },
      { time: "1:24:29", title: "Lactate, Oxygen & Exercise Hierarchy", cat: "Exercise", summary: "Lactate is an essential fuel shuttle. Zone 2 exercise expands mitochondrial density and lactate clearance capacity." },
      { time: "1:31:32", title: "Cancer, Warburg Effect & Rewiring", cat: "Oncology", summary: "Tumor cells downregulate mitochondrial pyruvate entry (Warburg Effect) to harvest carbon building blocks for fast division." },
      { time: "1:43:00", title: "Therapy Combinations & Future Medicine", cat: "Therapeutics", summary: "Combining metabolic modulators (like MPC targets) with standard therapies starves malignant cells while protecting healthy tissue." }
    ],
    es: [
      { time: "00:00", title: "Intro del Dr. Jared Rutter y Laboratorio", cat: "Intro", summary: "El Dr. Andrew Huberman presenta al Dr. Jared Rutter, Profesor de Bioquímica en la Universidad de Utah e Investigador del HHMI, reconocido por descubrir mecanismos de metabolismo mitocondrial." },
      { time: "02:29", title: "Metabolismo, Células y Envejecimiento", cat: "Fundamentos", summary: "El metabolismo es mucho más que contar calorías; es la suma de transformaciones químicas celulares que dictan la identidad y el envejecimiento biológico." },
      { time: "08:36", title: "Origen Mitocondrial y Complejidad", cat: "Evolución", summary: "Las mitocondrias se originaron hace 1.500 millones de años por endosimbiosis, desbloqueando alta densidad energética para la vida pluricelular." },
      { time: "15:16", title: "Genoma Mitocondrial y Herencia", cat: "Genética", summary: "Las mitocondrias conservan su propio ADN circular (mtDNA) que codifica 13 proteínas respiratorias clave, heredadas estrictamente por vía materna." },
      { time: "18:18", title: "Distribución Espacial y Tejidos", cat: "Biología Celular", summary: "Las mitocondrias forman redes dinámicas envueltas en miofibrillas musculares, axones neuronales y grasa parda para termogénesis." },
      { time: "25:59", title: "Energía, Hormonas y Células Grasas", cat: "Endocrinología", summary: "Los adipocitos detectan hormonas sistémicas (insulina, glucagón, adrenalina) para regular la oxidación de lípidos frente al almacenamiento." },
      { time: "31:13", title: "Glucosa, ATP y Piruvato (MPC1/MPC2)", cat: "Bioenergética", summary: "El Transportador de Piruvato Mitocondrial (MPC1/MPC2) es el cuello de botella que decide si el piruvato se quema para ATP o se convierte en bloques citosólicos." },
      { time: "36:41", title: "Elección Celular: Energía vs. Crecimiento", cat: "Destino Celular", summary: "Las células enfrentan una encrucijada: generar el máximo de ATP para mantenimiento O desviar esqueletos de carbono para fabricar lípidos y dividirse." },
      { time: "48:36", title: "Microbioma y Crosstalk Celular", cat: "Metabolómica", summary: "Los ácidos grasos de cadena corta del microbioma alimentan directamente la respiración mitocondrial del huésped y la transcripción génica." },
      { time: "51:44", title: "Descubrimiento de MPC1 y MPC2", cat: "Descubrimiento", summary: "El laboratorio del Dr. Rutter identificó los genes del MPC1 y MPC2, resolviendo un misterio bioquímico de 40 años y abriendo dianas terapéuticas." },
      { time: "59:42", title: "Detección de Recursos: Ayuno y Glucagón", cat: "Fisiología", summary: "Durante el ayuno, el glucagón señala a las mitocondrias que cambien su preferencia de sustrato de glucosa a ácidos grasos y cuerpos cetónicos." },
      { time: "1:07:03", title: "MPC y Patofisiología de Insuficiencia Cardíaca", cat: "Cardiología", summary: "En la insuficiencia cardíaca, el miocardio pierde flexibilidad metabólica. La falla del MPC priva al corazón de una oxidación eficiente de piruvato." },
      { time: "1:13:24", title: "Tamaño Celular, Combustible e Identidad", cat: "Salud Celular", summary: "Alterar el equilibrio de combustible mitocondrial modifica la remodelación de cromatina y el estado epigenético, cambiando la identidad celular." },
      { time: "1:24:29", title: "Lactato, Oxígeno y Jerarquía en Ejercicio", cat: "Fisiología", summary: "El lactato es un combustible vital. El ejercicio en Zona 2 expande la densidad mitocondrial y la capacidad de aclaramiento de lactato." },
      { time: "1:31:32", title: "Cáncer, Efecto Warburg y Rebobinado", cat: "Oncología", summary: "Las células tumorales reducen la entrada de piruvato a la mitocondria (Efecto Warburg) para cosechar carbono para su rápida división." },
      { time: "1:43:00", title: "Terapéuticas Combinadas del Futuro", cat: "Terapéutica", summary: "Combinar moduladores metabólicos (como dianas de MPC) con terapias estándar mata de hambre a las células malignas protegiendo el tejido sano." }
    ],
    he: [
      { time: "00:00", title: "הקדמה על ד״ר ג׳ארד ראטר והמעבדה", cat: "הקדמה", summary: "ד״ר אנדרו הברמן מציג את ד״ר ג׳ארד ראטר, פרופסור לביוכימיה באוניברסיטת יוטה וחוקר במכון HHMI, הידוע בתגליותיו בתחום המטבוליזם המיטוכונדריאלי." },
      { time: "02:29", title: "מטבוליזם, תאים והזדקנות", cat: "יסודות", summary: "מטבוליזם הוא הרבה מעבר לספירת קלוריות; הוא סכום השינויים הכימיים בתא המכתיבים את זהות התא וקצב ההזדקנות הביולוגית." },
      { time: "08:36", title: "מקור המיטוכונדריה ומורכבות התא", cat: "אבולוציה", summary: "המיטוכונדריה נוצרה לפני כ-1.5 מיליארד שנים באמצעות אנדוסימביוזה (חיידק בתוך תא מארח), מה שפתח צפיפות אנרגטית ליצורים רב-תאיים." },
      { time: "15:16", title: "גנום המיטוכונדריה ותורשה אימהית", cat: "גנטיקה", summary: "המיטוכונדריה שומרת על DNA מעגלי משלה (mtDNA) המקודד 13 חלבוני נשימה מרכזיים, המועברים בתורשה אימהית בלבד." },
      { time: "18:18", title: "פיזור מרחבי וספציפיות לרקמות", cat: "ביולוגיה תאית", summary: "המיטוכונדריות יוצרות רשתות דינמיות העוטפות מיופיברילים בשריר, אקסונים בנוירונים ושומן חום ליצירת חום." },
      { time: "25:59", title: "אנרגיית נוטריאנטים, הורמונים ותאי שומן", cat: "אנדוקרינולוגיה", summary: "תאי שומן חשים הורמונים סיסטמיים (אינסולין, גלוקגון, אדרנלין) כדי לווסת חמצון שומנים מיטוכונדריאלי מול אגירה." },
      { time: "31:13", title: "גלוקוז, ATP ופירובט (MPC1/MPC2)", cat: "ביואנרגטיקה", summary: "נשא הפירובט המיטוכונדריאלי (MPC1/MPC2) הוא צוואר הבקבוק הקובע אם הפירובט יישרף ל-ATP או יומתר לאבני בניין בציטוזול." },
      { time: "36:41", title: "בחירת התא: אנרגיה מול גדילה (סרטן ונגיפים)", cat: "גורל התא", summary: "תאים עומדים בפני צומת דרכים: לייצר מקסימום ATP לתחזוקה או לנתב שלדי פחמן לבניית שומנים וחומצות גרעין לחלוקת התא." },
      { time: "48:36", title: "המיקרוביום ותקשורת עם המארח", cat: "מטבולומיקה", summary: "חומצות שומן קצרות שרשרת מהמיקרוביום (אצטט, בוטיראט) מזינות באופן ישיר את הנשימה המיטוכונדריאלית והשעתוק בגוף." },
      { time: "51:44", title: "גילוי ה-MPC1 ו-MPC2", cat: "פריצת דרך", summary: "מעבדת ד״ר ראטר זיהתה את הגנים המקודדים ל-MPC1 ו-MPC2, פתרה תעלומה ביוכימית בת 40 שנה ופתחה יעד לטיפול במחלות מטבוליות." },
      { time: "59:42", title: "חישת משאבים: צום וגלוקגון", cat: "פיזיולוגיה", summary: "במהלך צום, גלוקגון מאותת למיטוכונדריה להעביר את העדפת הדלק מגלוקוז לחומצות שומן וגופי קטון." },
      { time: "1:07:03", title: "MPC ופתופסיכולוגיה של אי-ספיקת לב", cat: "קרדיולוגיה", summary: "באי-ספיקת לב, שריר הלב מאבד גמישות מטבולית. פגיעה ב-MPC מונעת מהלב חמצון פירובט יעיל." },
      { time: "1:13:24", title: "גודל התא, מאזן דלקים וזהות", cat: "בריאות התא", summary: "שיבוש מאזן הדלקים המיטוכונדריאלי משנה את ארגון הכרומטין והמצב האפיגנטי, ומכאן משנה את זהות התא." },
      { time: "1:24:29", title: "לקטט, חמצן והיררכיית אימון", cat: "פיזיולוגיה", summary: "לקטט הוא דלק חיוני. אימון בזון 2 מרחיב את צפיפות המיטוכונדריה ואת קיבולת פינוי הלקטט." },
      { time: "1:31:32", title: "סרטן, אפקט ורבורג וחיווט מחדש", cat: "אונקולוגיה", summary: "תאים סרטניים מפחיתים כניסת פירובט למיטוכונדריה (אפקט ורבורג) כדי לקצור פחמן לחלוקת תא מהירה." },
      { time: "1:43:00", title: "שילובי טיפול ותרופות העתיד", cat: "תרפויטיקה", summary: "שילוב מעכבים מטבוליים (כמו יעדי MPC) עם טיפולים סטנדרטיים מרעיב תאים ממאירים תוך שמירה על רקמה בריאה." }
    ]
  };

  const stateConfigs = {
    en: {
      zone2: {
        name: "Zone 2 Steady-State Exercise",
        badge: "🟢 Optimal Aerobic / FATmax",
        color: "border-emerald-500 bg-emerald-950/20 text-emerald-300",
        mpcStatus: "Active & Balanced (MPC1/2 Optimized)",
        pyruvateFate: "Smooth entry into Mitochondria -> Acetyl-CoA -> Krebs Cycle",
        atpYield: "36 - 38 ATP per glucose molecule (High efficiency)",
        lactateAccumulation: "Baseline Steady-State (< 2.0 mmol/L)",
        cellularGoal: "Long-term cellular maintenance, mitochondrial biogenesis (PGC-1α), high aerobic endurance",
        description: "Mitochondria process both fatty acids (via Beta-Oxidation) and pyruvate (via MPC1/2) with complete oxygen coupling, maintaining minimal metabolic stress."
      },
      fasting: {
        name: "Fasting State / High Glucagon",
        badge: "🔵 Lipid Oxidation & Autophagy",
        color: "border-blue-500 bg-blue-950/20 text-blue-300",
        mpcStatus: "Sparing Glucose / Downregulated for Gluconeogenesis",
        pyruvateFate: "Pyruvate directed to Liver Gluconeogenesis; Mitochondria burn Fatty Acids & Ketones",
        atpYield: "~129 ATP per Palmitate (Fatty Acid Oxidation)",
        lactateAccumulation: "Very Low",
        cellularGoal: "Preserve blood glucose for brain, clear damaged organelle debris (Autophagy)",
        description: "Glucagon signals mitochondria to switch substrate preference to free fatty acids and ketone bodies, preserving precious glycogen stores."
      },
      intense: {
        name: "Anaerobic Sprint / High Hypoxia",
        badge: "🟠 Glycolytic Surge / High Lactate",
        color: "border-amber-500 bg-amber-950/20 text-amber-300",
        mpcStatus: "Saturated Bottleneck",
        pyruvateFate: "Pyruvate exceeds mitochondrial capacity -> Converted to Lactate via LDH in Cytosol",
        atpYield: "2 ATP per glucose (Fast rate, low efficiency)",
        lactateAccumulation: "High Rapid Accumulation (> 6.0 mmol/L)",
        cellularGoal: "Immediate explosive power output at the cost of rapid fatigue",
        description: "Pyruvate production overwhelms MPC1/2 capacity. Cytosolic Lactate Dehydrogenase converts excess pyruvate into lactate and H+, causing acidosis."
      },
      cancer: {
        name: "Warburg Effect (Cancer Proliferation)",
        badge: "🔴 Pathological Metabolic Rewiring",
        color: "border-rose-500 bg-rose-950/20 text-rose-300",
        mpcStatus: "Suppressed / Silenced",
        pyruvateFate: "Diverted away from Mitochondria to build Cell Membrane Lipids & Nucleic Acids",
        atpYield: "Low per glucose, but rapid substrate flux",
        lactateAccumulation: "Continuous Lactate Export (Acidic Tumor Microenvironment)",
        cellularGoal: "Rapid biomass synthesis and uncontrolled cell division",
        description: "Tumor cells suppress MPC1/2 so pyruvate carbon atoms aren't burned for energy, but harvested as building blocks to double cell mass."
      }
    },
    es: {
      zone2: {
        name: "Ejercicio Estable en Zona 2",
        badge: "🟢 Aeróbico Óptimo / FATmax",
        color: "border-emerald-500 bg-emerald-950/20 text-emerald-300",
        mpcStatus: "Activo y Equilibrado (MPC1/2 Optimizado)",
        pyruvateFate: "Entrada fluida a Mitocondria -> Acetil-CoA -> Ciclo de Krebs",
        atpYield: "36 - 38 ATP por glucosa (Alta eficiencia)",
        lactateAccumulation: "Equilibrio Basal (< 2.0 mmol/L)",
        cellularGoal: "Mantenimiento celular a largo plazo, biogénesis mitocondrial (PGC-1α), resistencia aeróbica",
        description: "Las mitocondrias procesan ácidos grasos y piruvato con acoplamiento completo de oxígeno, manteniendo mínimo estrés metabólico."
      },
      fasting: {
        name: "Estado de Ayuno / Glucagón Alto",
        badge: "🔵 Oxidación de Lípidos y Autofagia",
        color: "border-blue-500 bg-blue-950/20 text-blue-300",
        mpcStatus: "Ahorro de Glucosa / Gluconeogénesis",
        pyruvateFate: "Piruvato dirigido a Gluconeogénesis hepática; Mitocondrias queman Grasa y Cetonas",
        atpYield: "~129 ATP por Palmitato (Oxidación Grasa)",
        lactateAccumulation: "Muy Bajo",
        cellularGoal: "Preservar glucosa sanguínea para el cerebro, limpiar desechos celulares (Autofagia)",
        description: "El glucagón indica a las mitocondrias cambiar la preferencia a ácidos grasos libres y cuerpos cetónicos, conservando reservas de glucógeno."
      },
      intense: {
        name: "Esprint Anaeróbico / Hipoxia Alta",
        badge: "🟠 Oleada Glucolítica / Lactato Alto",
        color: "border-amber-500 bg-amber-950/20 text-amber-300",
        mpcStatus: "Cuello de Botella Saturado",
        pyruvateFate: "Piruvato excede capacidad mitocondrial -> Convertido a Lactato por LDH en Citosol",
        atpYield: "2 ATP por glucosa (Rápido, baja eficiencia)",
        lactateAccumulation: "Acumulación Rápida (> 6.0 mmol/L)",
        cellularGoal: "Potencia explosiva inmediata a costa de fatiga rápida",
        description: "La producción de piruvato supera al MPC1/2. La Lactato Deshidrogenasa citosólica convierte el exceso en lactato y H+, causando acidosis."
      },
      cancer: {
        name: "Efecto Warburg (Proliferación Tumoral)",
        badge: "🔴 Rebobinado Metabólico Patológico",
        color: "border-rose-500 bg-rose-950/20 text-rose-300",
        mpcStatus: "Suprimido / Silenciado",
        pyruvateFate: "Desviado de la Mitocondria para construir Lípidos de Membrana y Ácidos Nucleicos",
        atpYield: "Bajo por glucosa, pero flujo de sustrato rápido",
        lactateAccumulation: "Exportación Continua de Lactato (Entorno Tumoral Ácido)",
        cellularGoal: "Síntesis rápida de biomasa y división celular descontrolada",
        description: "Las células tumorales suprimen MPC1/2 para cosechar átomos de carbono del piruvato como bloques de construcción celular."
      }
    },
    he: {
      zone2: {
        name: "אימון במצב יציב בזור 2",
        badge: "🟢 אירובי אופטימלי / FATmax",
        color: "border-emerald-500 bg-emerald-950/20 text-emerald-300",
        mpcStatus: "פעיל ומאוזן (MPC1/2 אופטימלי)",
        pyruvateFate: "כניסה חלקה למיטוכונדריה -> אצטיל-CoA -> מעגל קרבס",
        atpYield: "36 - 38 ATP לכל מולקולת גלוקוז (יעילות גבוהה)",
        lactateAccumulation: "רמת בסיס יציבה (< 2.0 mmol/L)",
        cellularGoal: "תחזוקה תאית לטווח ארוך, ביוגנזה מיטוכונדריאלית (PGC-1α), סבילות אירובית גבוהה",
        description: "המיטוכונדריה מפרקת חומצות שומן ופירובט תוך ניצול חמצן מלא ושמירה על עומס מטבולי מינימלי."
      },
      fasting: {
        name: "מצב צום / גלוקגון גבוה",
        badge: "🔵 חמצון שומנים ואוטופגיה",
        color: "border-blue-500 bg-blue-950/20 text-blue-300",
        mpcStatus: "חיסכון בגלוקוז / גלוקונאוגנזה",
        pyruvateFate: "פירובט מנותב לגלוקונאוגנזה בכבד; מיטוכונדריה שורפת שומן וגופי קטון",
        atpYield: "~129 ATP לכל מולקולת פלמיטאט (חמצון שומן)",
        lactateAccumulation: "נמוך מאוד",
        cellularGoal: "שמירה על גלוקוז בדם למוח, ניקוי פסולת תאית (אוטופגיה)",
        description: "גלוקגון מאותת למיטוכונדריה לעבור לחומצות שומן חופשיות וגופי קטון כדי לשמור על מאגרי גליקוגן."
      },
      intense: {
        name: "ספרינט אנאירובי / היפוקסיה גבוהה",
        badge: "🟠 פרץ גליקוליטי / לקטט גבוה",
        color: "border-amber-500 bg-amber-950/20 text-amber-300",
        mpcStatus: "צוואר בקבוק רווי",
        pyruvateFate: "פירובט חורג מקיבולת המיטוכונדריה -> מומר ללקטט על ידי LDH בציטוזול",
        atpYield: "2 ATP לכל גלוקוז (קצב מהיר, יעילות נמוכה)",
        lactateAccumulation: "הצטברות מהירה (> 6.0 mmol/L)",
        cellularGoal: "מתן כוח מתפרץ מיידי במחיר עייפות מהירה",
        description: "ייצור הפירובט גובר על קיבולת ה-MPC1/2. אנזים LDH בציטוזול ממיר עודף פירובט ללקטט ופרוטונים."
      },
      cancer: {
        name: "אפקט ורבורג (שגשוג גידול סרטני)",
        badge: "🔴 חיווט מטבולי פתולוגי",
        color: "border-rose-500 bg-rose-950/20 text-rose-300",
        mpcStatus: "מושתק / מדוכא",
        pyruvateFate: "מנותב מחוץ למיטוכונדריה לבניית שומני קרום וחומצות גרעין",
        atpYield: "נמוך לכל גלוקוז, אך זרימת דלק מהירה",
        lactateAccumulation: "ייצוא לקטט מתמשך (סביבת גידול חומצית)",
        cellularGoal: "סינתזת ביומסה מהירה וחיווט חלוקת תא ללא פיקוח",
        description: "תאים סרטניים מדכאים את ה-MPC1/2 כדי לקצור אטומי פחמן של פירובט כאבני בניין להכפלת התא."
      }
    }
  };

  const currText = content[lang] || content.en;
  const currChapters = chaptersData[lang] || chaptersData.en;
  const currStateConfig = stateConfigs[lang] || stateConfigs.en;
  const activeStateObj = currStateConfig[cellState];

  return (
    <article 
      dir={currText.dir}
      className={`space-y-10 animate-fade-in font-sans text-stone-900 ${currText.dir === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      
      {/* LANGUAGE SELECTOR TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-900 text-white shadow-md border border-stone-800">
        <div className="flex items-center gap-2 font-bold text-xs text-stone-200">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Clip Language / שפה / Idioma:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              lang === 'en'
                ? 'bg-emerald-500 text-stone-950 shadow-xs border border-emerald-400'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <span>🇺🇸 English</span>
          </button>
          
          <button
            onClick={() => setLang('es')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              lang === 'es'
                ? 'bg-emerald-500 text-stone-950 shadow-xs border border-emerald-400'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <span>🇪🇸 Español</span>
          </button>

          <button
            onClick={() => setLang('he')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              lang === 'he'
                ? 'bg-emerald-500 text-stone-950 shadow-xs border border-emerald-400'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <span>🇮🇱 עברית</span>
          </button>
        </div>
      </div>

      {/* ARTICLE HEADER HERO */}
      <div className="space-y-4 border-b border-stone-200 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-900 font-extrabold text-xs uppercase tracking-wider border border-red-300 inline-flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-red-600" />
            {currText.headerBadge}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-300">
            {currText.expertBadge}
          </span>
          <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono text-xs">
            {currText.dateBadge}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          {currText.title}
        </h1>
        
        <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-4xl">
          {currText.subtitle}
        </p>
      </div>

      {/* EMBEDDED TWEET & PODCAST CARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Twitter Clip & Interactive Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl border border-stone-800 space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-lg shadow-md">
                  H
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-100">Huberman Lab Podcast</h3>
                  <p className="text-xs text-stone-400">@hubermanlab • Broadcast Clip</p>
                </div>
              </div>
              <a 
                href="https://x.com/hubermanlab/status/2096961695885488191" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-xl transition border border-stone-700 font-medium"
              >
                <span>{currText.viewOnX}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Tweet Box */}
            <div className="space-y-4 text-stone-200 text-sm leading-relaxed font-normal bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <blockquote className="twitter-tweet" data-media-max-width="560">
                <p lang="en" dir="ltr" className="whitespace-pre-line text-xs sm:text-sm">
                  {currText.tweetContent}
                </p>
                <a href="https://x.com/hubermanlab/status/2096961695885488191?ref_src=twsrc%5Etfw" className="text-stone-400 hover:underline text-xs block mt-2">
                  September 7, 2026
                </a>
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/80 gap-2">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-red-500" />
                <span className="font-mono">Duration: 1h 45m</span>
              </div>
              <span className="text-emerald-400 font-bold">Dr. Jared Rutter (@rutterlab)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Insights Overview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-emerald-900/10 border border-emerald-300/60 space-y-4">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{currText.insightsTitle}</span>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-stone-800">
              {currText.insights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {item.title}
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* INTERACTIVE CELL FATE & MPC SIMULATOR */}
      <section className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white space-y-6 shadow-2xl border border-stone-800">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
              <Cpu className="w-4 h-4" />
              Interactive Bioenergetic Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {currText.simulatorTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {currText.simulatorSub}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(currStateConfig).map((key) => (
              <button
                key={key}
                onClick={() => setCellState(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                  cellState === key
                    ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-lg scale-105'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {currStateConfig[key].name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic State Dashboard */}
        <div className={`p-6 rounded-2xl border ${activeStateObj.color} transition-all duration-300 space-y-6`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/60 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              {activeStateObj.name}
            </h3>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 text-xs font-mono font-bold text-white border border-stone-700">
              {activeStateObj.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
              <span className="text-stone-400 font-mono uppercase text-[10px]">{currText.mpcLabel}</span>
              <p className="font-bold text-stone-100">{activeStateObj.mpcStatus}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
              <span className="text-stone-400 font-mono uppercase text-[10px]">{currText.pyruvateLabel}</span>
              <p className="font-bold text-stone-100">{activeStateObj.pyruvateFate}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
              <span className="text-stone-400 font-mono uppercase text-[10px]">{currText.atpLabel}</span>
              <p className="font-bold text-emerald-400 font-mono text-sm">{activeStateObj.atpYield}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
              <span className="text-stone-400 font-mono uppercase text-[10px]">{currText.lactateLabel}</span>
              <p className="font-bold text-amber-300 font-mono text-sm">{activeStateObj.lactateAccumulation}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <span className="text-stone-400 font-mono uppercase text-[10px] block">{currText.goalLabel}</span>
            <p className="text-sm font-semibold text-stone-200">{activeStateObj.cellularGoal}</p>
            <p className="text-xs text-stone-400 leading-relaxed pt-1 font-normal border-t border-stone-800/60">
              {activeStateObj.description}
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CHAPTER NAVIGATOR & FULL EPISODE SUMMARY */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-stone-900">
              {currText.chapterSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {currText.chapterSectionSub}
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            {currText.chapterBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Chapter Selector List */}
          <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
            {currChapters.map((ch, index) => (
              <button
                key={index}
                onClick={() => setActiveChapter(index)}
                className={`w-full text-left p-3.5 rounded-2xl transition flex items-center justify-between border ${
                  activeChapter === index
                    ? 'bg-emerald-900 text-white border-emerald-800 shadow-md font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    activeChapter === index ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {ch.time}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-[240px]">
                    {ch.title}
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  activeChapter === index ? 'bg-emerald-800 border-emerald-600 text-emerald-200' : 'bg-stone-200/60 border-stone-300 text-stone-600'
                }`}>
                  {ch.cat}
                </span>
              </button>
            ))}
          </div>

          {/* Right Selected Chapter Detail View */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-900 text-white font-mono text-xs font-bold shadow-xs">
                  {currChapters[activeChapter].time}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                  {currChapters[activeChapter].cat}
                </span>
              </div>
              <span className="text-xs text-stone-400 font-mono">Chapter {activeChapter + 1} / {currChapters.length}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {currChapters[activeChapter].title}
            </h3>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-700" />
                {currText.summaryTitle}
              </span>
              <p className="text-stone-700 text-sm leading-relaxed font-normal">
                {currChapters[activeChapter].summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                disabled={activeChapter === 0}
                onClick={() => setActiveChapter(prev => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold disabled:opacity-40 transition"
              >
                {currText.prevChapter}
              </button>
              <button
                disabled={activeChapter === currChapters.length - 1}
                onClick={() => setActiveChapter(prev => Math.min(currChapters.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold disabled:opacity-40 transition"
              >
                {currText.nextChapter}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* OPTIMUS MAGAZINE EDITORIAL SUMMARY & ACTIONABLE INSIGHTS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950 text-white space-y-6 shadow-xl border border-emerald-900">
        <div className="flex items-center gap-3 border-b border-emerald-800 pb-4">
          <div className="p-2 rounded-xl bg-emerald-800 text-emerald-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{currText.editorialTitle}</h2>
            <p className="text-xs text-emerald-300 font-mono">{currText.editorialSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-emerald-100 leading-relaxed">
          {currText.editorialPillars.map((pillar, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 space-y-2">
              <span className="font-bold text-white text-sm block">{pillar.title}</span>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

    </article>
  );
}
