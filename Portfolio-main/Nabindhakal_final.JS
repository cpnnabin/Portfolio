// ================================================================
// nabindhakal28.com.np — Cloudflare Worker (Final)
// Matches cpnnabin portfolio design exactly
// Contact form saves to D1 database
// All data (projects, skills, education, experience) from D1
// ================================================================

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
const json = (d, s = 200) =>
  new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
const err = (msg, s = 400) => json({ error: msg }, s);

function buildHTML(projects, skills, education, experience) {
  const projectsJSON = JSON.stringify(projects);
  const skillsJSON   = JSON.stringify(skills);
  const educationJSON= JSON.stringify(education);
  const experienceJSON=JSON.stringify(experience);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nabin Dhakal (cpnnabin) - Software Engineer & Managing Director</title>
  <meta name="description" content="Nabin Dhakal - Software Engineering Student & Managing Director at BS International. Specializing in Java backend development, system design, and business innovation."/>
  <meta name="keywords" content="Nabin Dhakal, cpnnabin, Software Engineer Nepal, Java Developer, Spring Boot, MySQL, Managing Director"/>
  <meta name="author" content="Nabin Dhakal (cpnnabin)"/>
  <link rel="canonical" href="https://nabindhakal28.com.np"/>
  <meta name="theme-color" content="#1e293b"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://nabindhakal28.com.np"/>
  <meta property="og:title" content="Nabin Dhakal - Software Engineer & Managing Director"/>
  <meta property="og:description" content="Software Engineering Student & Managing Director at BS International. Expert in Java, Spring Boot, MySQL."/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="@cpnnabin"/>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&lt;/&gt;</text></svg>"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    @keyframes fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes gradient-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes skill-bar { from{width:0%} to{width:var(--skill-width)} }
    @keyframes typing { from{width:0} to{width:100%} }
    @keyframes blink-caret { from,to{border-color:transparent} 50%{border-color:var(--primary)} }
    @keyframes scroll { 0%{top:10px;opacity:1} 100%{top:30px;opacity:0} }
    @keyframes spin { to{transform:rotate(360deg)} }

    .animate-fade-in{animation:fade-in 0.8s ease-out forwards}
    .animate-gradient{animation:gradient-shift 8s ease infinite}
    .skill-bar-animate{animation:skill-bar 1.5s ease-out forwards}

    :root{--primary:#3b82f6;--secondary:#8b5cf6;--accent:#10b981;--dark:#0f172a}

    .glass-effect{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1)}
    .gradient-text{background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
    .gradient-bg{background:linear-gradient(-45deg,#3b82f6,#8b5cf6,#10b981,#3b82f6);background-size:400% 400%}
    .card-hover{transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}
    .card-hover:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 25px 50px rgba(0,0,0,0.25)}

    .typewriter{overflow:hidden;border-right:3px solid var(--primary);white-space:nowrap;animation:typing 3.5s steps(40,end),blink-caret 0.75s step-end infinite}
    @media(max-width:640px){.typewriter{white-space:normal;border-right:none;animation:none}}

    .scroll-indicator{width:30px;height:50px;border:2px solid var(--primary);border-radius:15px;position:relative;display:block}
    .scroll-indicator::before{content:'';position:absolute;width:6px;height:6px;border-radius:50%;background:var(--primary);left:50%;top:10px;transform:translateX(-50%);animation:scroll 2s infinite}

    .notification{position:fixed;top:20px;right:20px;z-index:1000;transform:translateX(400px);transition:transform 0.3s ease}
    .notification.show{transform:translateX(0)}

    .skill-card:hover .skill-progress{background:linear-gradient(90deg,var(--primary),var(--secondary))}

    /* Mobile improvements */
    @media(max-width:768px){
      .timeline-center{display:none}
      .timeline-item{display:block!important;padding-left:0!important;padding-right:0!important;text-align:left!important}
      .timeline-item .glass-effect{display:block!important;max-width:100%!important}
      .timeline-date{text-align:left!important;margin-bottom:0.5rem}
      .hero-img{width:200px!important;height:200px!important}
      .floating-icon{display:none}
    }
    @media(max-width:640px){
      h1{font-size:2.5rem!important}
      .hero-grid{grid-template-columns:1fr!important}
      .stat-grid{grid-template-columns:1fr 1fr!important}
    }
  </style>
</head>
<body class="bg-gray-900 text-gray-100 font-sans antialiased scroll-smooth">

<!-- Loading Screen -->
<div id="loading" class="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-500">
  <div class="text-center">
    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" style="animation:spin 1s linear infinite"></div>
    <p class="mt-4 text-lg font-semibold gradient-text">Initializing Portfolio...</p>
  </div>
</div>

<!-- Nav -->
<nav class="fixed top-0 left-0 right-0 z-40 glass-effect py-4 transition-all duration-300" id="navbar">
  <div class="container mx-auto px-6">
    <div class="flex items-center justify-between">
      <a href="#hero" class="text-2xl font-bold gradient-text font-mono">&lt;cpnnabin/&gt;</a>
      <div class="hidden md:flex items-center space-x-8">
        <a href="#about"      class="text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1">About</a>
        <a href="#skills"     class="text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1">Skills</a>
        <a href="#projects"   class="text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1">Projects</a>
        <a href="#education"  class="text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1">Education</a>
        <a href="#experience" class="text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1">Experience</a>
        <a href="#contact"    class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Contact</a>
      </div>
      <button id="menuBtn" class="md:hidden text-gray-300 hover:text-blue-400 p-2 rounded" aria-label="Toggle menu" aria-expanded="false">
        <i class="fas fa-bars text-2xl"></i>
      </button>
    </div>
    <div id="mobileMenu" class="md:hidden mt-4 hidden">
      <div class="flex flex-col space-y-2 py-4">
        <a href="#about"      class="text-gray-300 hover:text-blue-400 font-medium py-2 px-2 rounded">About</a>
        <a href="#skills"     class="text-gray-300 hover:text-blue-400 font-medium py-2 px-2 rounded">Skills</a>
        <a href="#projects"   class="text-gray-300 hover:text-blue-400 font-medium py-2 px-2 rounded">Projects</a>
        <a href="#education"  class="text-gray-300 hover:text-blue-400 font-medium py-2 px-2 rounded">Education</a>
        <a href="#experience" class="text-gray-300 hover:text-blue-400 font-medium py-2 px-2 rounded">Experience</a>
        <a href="#contact"    class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 text-center">Contact</a>
      </div>
    </div>
  </div>
</nav>

<!-- Hero -->
<section id="hero" class="min-h-screen flex items-center pt-16">
  <div class="container mx-auto px-6 py-20">
    <div class="grid lg:grid-cols-2 gap-12 items-center hero-grid">
      <div class="text-left">
        <div class="mb-6">
          <span class="inline-block bg-blue-600/10 text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-4 mr-2">
            <i class="fas fa-code mr-2"></i>Software Engineering Student
          </span>
          <span class="inline-block bg-purple-600/10 text-purple-400 px-4 py-1 rounded-full text-sm font-medium">
            <i class="fas fa-briefcase mr-2"></i>Managing Director
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Hi, I'm <span class="gradient-text">Nabin Dhakal</span>
        </h1>
        <h2 class="text-xl md:text-3xl text-gray-300 mb-6 font-mono typewriter">
          Backend Developer &amp; Business Leader
        </h2>
        <p class="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
          Building scalable systems with Java while leading BS International's growth in global markets.
          Passionate about backend architecture, database design, and sustainable business innovation.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center">
            <i class="fas fa-paper-plane mr-2"></i>Get in Touch
          </a>
          <a href="#projects" class="border border-blue-600 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600/10 transition-colors inline-flex items-center">
            <i class="fas fa-laptop-code mr-2"></i>View Projects
          </a>
          <a href="https://github.com/cpnnabin" target="_blank" rel="noopener noreferrer"
             class="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center">
            <i class="fab fa-github mr-2"></i>GitHub
          </a>
        </div>
        <!-- Social Links -->
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="https://linkedin.com/in/cpnnabin" target="_blank" aria-label="LinkedIn" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors"><i class="fab fa-linkedin-in text-lg"></i></a>
          <a href="https://x.com/cpnnabin" target="_blank" aria-label="X/Twitter" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors"><i class="fab fa-x-twitter text-lg"></i></a>
          <a href="https://github.com/cpnnabin" target="_blank" aria-label="GitHub" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-gray-400 hover:bg-gray-700 transition-colors"><i class="fab fa-github text-lg"></i></a>
          <a href="https://facebook.com/cpnnabin" target="_blank" aria-label="Facebook" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-gray-700 transition-colors"><i class="fab fa-facebook-f text-lg"></i></a>
          <a href="https://instagram.com/cpnnabin" target="_blank" aria-label="Instagram" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-pink-500 hover:bg-gray-700 transition-colors"><i class="fab fa-instagram text-lg"></i></a>
          <a href="https://youtube.com/@cpnnabin" target="_blank" aria-label="YouTube" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-gray-700 transition-colors"><i class="fab fa-youtube text-lg"></i></a>
          <a href="https://tiktok.com/@cpnnabin" target="_blank" aria-label="TikTok" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"><i class="fab fa-tiktok text-lg"></i></a>
          <a href="mailto:cpnnabingovnp@gmail.com" aria-label="Email" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-green-400 hover:bg-gray-700 transition-colors"><i class="fas fa-envelope text-lg"></i></a>
        </div>
      </div>
      <!-- Profile image -->
      <div class="relative flex justify-center">
        <div class="relative hero-img" style="width:320px;height:320px">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <img src="https://ui-avatars.com/api/?name=Nabin+Dhakal&background=1e293b&color=94a3b8&size=400"
               alt="Nabin Dhakal (cpnnabin)"
               class="relative w-full h-full rounded-full object-cover border-4 border-gray-800 shadow-2xl hover:scale-105 transition-transform duration-300"
               loading="lazy"/>
        </div>
        <div class="floating-icon absolute -top-4 -right-4 w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center">
          <i class="fab fa-java text-blue-400 text-3xl"></i>
        </div>
        <div class="floating-icon absolute -bottom-4 -left-4 w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center">
          <i class="fas fa-database text-purple-400 text-3xl"></i>
        </div>
        <div class="floating-icon absolute top-1/2 -right-8 w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center">
          <i class="fas fa-server text-green-400 text-2xl"></i>
        </div>
      </div>
    </div>
    <div class="mt-20 flex justify-center">
      <a href="#about" class="scroll-indicator" aria-label="Scroll to About"></a>
    </div>
  </div>
</section>

<!-- About -->
<section id="about" class="py-20 bg-gray-800/50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">About Me</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
    </div>
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 class="text-2xl font-bold mb-6">My Journey</h3>
        <p class="text-gray-400 mb-6 leading-relaxed">I'm a Software Engineering student specializing in backend development with Java and database systems. I'm currently pursuing my BSc in Software Engineering at Patan College for Professional Studies, Kupandol, Lalitpur.</p>
        <p class="text-gray-400 mb-6 leading-relaxed">Alongside my studies, I serve as the Managing Director of BS International Pvt. Ltd., where I lead operations and strategic initiatives in Nepal's garment manufacturing sector.</p>
        <p class="text-gray-400 mb-6 leading-relaxed">With a mix of technical skills and business leadership, I aim to connect technology with traditional industries. I focus on building practical and sustainable solutions that support digital transformation and economic growth.</p>
        <div class="grid grid-cols-2 gap-6 mt-8 stat-grid">
          <div class="glass-effect p-6 rounded-xl card-hover"><div class="text-3xl font-bold text-blue-400 mb-2">1000+</div><div class="text-gray-400">Lines of Code</div></div>
          <div class="glass-effect p-6 rounded-xl card-hover"><div class="text-3xl font-bold text-purple-400 mb-2" id="proj-stat">5+</div><div class="text-gray-400">Projects Completed</div></div>
          <div class="glass-effect p-6 rounded-xl card-hover"><div class="text-3xl font-bold text-green-400 mb-2">60+</div><div class="text-gray-400">Team Members Led</div></div>
          <div class="glass-effect p-6 rounded-xl card-hover"><div class="text-3xl font-bold text-blue-400 mb-2">2</div><div class="text-gray-400">Active Roles</div></div>
        </div>
      </div>
      <div class="glass-effect p-8 rounded-2xl">
        <h3 class="text-2xl font-bold mb-6">Personal Info</h3>
        <div class="space-y-4">
          <div class="flex items-center"><div class="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-user text-blue-400"></i></div><div><div class="text-sm text-gray-500">Full Name</div><div class="font-medium">Nabin Dhakal (@cpnnabin)</div></div></div>
          <div class="flex items-center"><div class="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-calendar text-purple-400"></i></div><div><div class="text-sm text-gray-500">Date of Birth</div><div class="font-medium">April 28, 2004</div></div></div>
          <div class="flex items-center"><div class="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-map-marker-alt text-green-400"></i></div><div><div class="text-sm text-gray-500">Location</div><div class="font-medium">Dhapakhel, Lalitpur, Nepal</div></div></div>
          <div class="flex items-center"><div class="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-graduation-cap text-blue-400"></i></div><div><div class="text-sm text-gray-500">Education</div><div class="font-medium">BSc. Software Engineering</div><div class="text-sm text-gray-500">University of Bedfordshire</div></div></div>
          <div class="flex items-center"><div class="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-briefcase text-purple-400"></i></div><div><div class="text-sm text-gray-500">Position</div><div class="font-medium">Managing Director</div><div class="text-sm text-gray-500">BS International Pvt. Ltd.</div></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Skills -->
<section id="skills" class="py-20">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Technical Skills</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
    </div>
    <div id="skills-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="glass-effect p-8 rounded-2xl animate-pulse h-64"></div>
      <div class="glass-effect p-8 rounded-2xl animate-pulse h-64"></div>
      <div class="glass-effect p-8 rounded-2xl animate-pulse h-64"></div>
    </div>
    <!-- Tech Stack Icons -->
    <div class="mt-20">
      <h3 class="text-2xl font-bold text-center mb-8">Technology Stack</h3>
      <div class="flex flex-wrap justify-center gap-8">
        <div class="text-center card-hover"><div class="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-blue-600/20 transition-all"><i class="devicon-java-plain text-4xl text-blue-400"></i></div><span class="text-gray-400">Java</span></div>
        <div class="text-center card-hover"><div class="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-purple-600/20 transition-all"><i class="devicon-mysql-plain text-4xl text-purple-400"></i></div><span class="text-gray-400">MySQL</span></div>
        <div class="text-center card-hover"><div class="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-blue-600/20 transition-all"><i class="devicon-spring-plain text-4xl text-blue-400"></i></div><span class="text-gray-400">Spring</span></div>
        <div class="text-center card-hover"><div class="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-green-600/20 transition-all"><i class="devicon-git-plain text-4xl text-green-400"></i></div><span class="text-gray-400">Git</span></div>
        <div class="text-center card-hover"><div class="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-purple-600/20 transition-all"><i class="devicon-html5-plain text-4xl text-purple-400"></i></div><span class="text-gray-400">HTML5</span></div>
        <div class="text-center card-hover"><div class="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-2 hover:bg-blue-600/20 transition-all"><i class="devicon-css3-plain text-4xl text-blue-400"></i></div><span class="text-gray-400">CSS3</span></div>
      </div>
    </div>
  </div>
</section>

<!-- Projects -->
<section id="projects" class="py-20 bg-gray-800/50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Featured Projects</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
    </div>
    <div id="projects-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="glass-effect rounded-2xl p-6 animate-pulse h-64"></div>
      <div class="glass-effect rounded-2xl p-6 animate-pulse h-64"></div>
      <div class="glass-effect rounded-2xl p-6 animate-pulse h-64"></div>
    </div>
    <div class="text-center mt-12">
      <a href="https://github.com/cpnnabin" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">
        <i class="fab fa-github mr-2"></i>View All Projects on GitHub
      </a>
    </div>
  </div>
</section>

<!-- Education -->
<section id="education" class="py-20 bg-gray-800/50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Education</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
    </div>
    <div id="education-container" class="max-w-5xl mx-auto">
      <div class="text-center text-gray-400">Loading...</div>
    </div>
  </div>
</section>

<!-- Experience -->
<section id="experience" class="py-20">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Professional Experience</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
    </div>
    <div id="experience-container" class="max-w-4xl mx-auto">
      <div class="text-center text-gray-400">Loading...</div>
    </div>
  </div>
</section>

<!-- Contact -->
<section id="contact" class="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Get In Touch</h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
      <p class="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">Interested in collaborating on a project, discussing opportunities, or just want to connect? Feel free to reach out!</p>
    </div>
    <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      <div>
        <div class="glass-effect p-8 rounded-2xl mb-8">
          <h3 class="text-2xl font-bold mb-6">Contact Information</h3>
          <div class="space-y-6">
            <div class="flex items-center"><div class="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-phone text-blue-400"></i></div><div><div class="text-sm text-gray-500">Phone</div><div class="font-medium">+977 986-9596970</div></div></div>
            <div class="flex items-center"><div class="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-envelope text-purple-400"></i></div><div><div class="text-sm text-gray-500">Email</div><div class="font-medium">cpnnabingovnp@gmail.com</div></div></div>
            <div class="flex items-center"><div class="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mr-4"><i class="fas fa-map-marker-alt text-green-400"></i></div><div><div class="text-sm text-gray-500">Location</div><div class="font-medium">Dhapakhel, Lalitpur, Nepal</div></div></div>
          </div>
        </div>
        <div class="glass-effect p-8 rounded-2xl">
          <h3 class="text-2xl font-bold mb-6">Quick Links</h3>
          <div class="grid grid-cols-2 gap-4">
            <a href="https://github.com/cpnnabin" target="_blank" class="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><i class="fab fa-github text-2xl mr-3"></i><span>GitHub</span></a>
            <a href="https://linkedin.com/in/cpnnabin" target="_blank" class="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><i class="fab fa-linkedin text-2xl mr-3"></i><span>LinkedIn</span></a>
            <a href="https://twitter.com/cpnnabin" target="_blank" class="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><i class="fab fa-twitter text-2xl mr-3"></i><span>Twitter</span></a>
            <a href="https://bsinternational.com.np" target="_blank" class="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><i class="fas fa-briefcase text-2xl mr-3"></i><span>BS International</span></a>
          </div>
        </div>
      </div>
      <!-- Contact Form — saves to D1 -->
      <div class="glass-effect p-8 rounded-2xl">
        <h3 class="text-2xl font-bold mb-6">Send Message</h3>
        <form id="contactForm" class="space-y-6" novalidate>
          <div>
            <label for="cname" class="block text-gray-400 mb-2 font-medium">Full Name</label>
            <input type="text" id="cname" name="name" required
                   class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                   placeholder="Your Name"/>
          </div>
          <div>
            <label for="cemail" class="block text-gray-400 mb-2 font-medium">Email Address</label>
            <input type="email" id="cemail" name="email" required
                   class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                   placeholder="your.email@example.com"/>
          </div>
          <div>
            <label for="csubject" class="block text-gray-400 mb-2 font-medium">Subject</label>
            <input type="text" id="csubject" name="subject"
                   class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                   placeholder="Subject of your message"/>
          </div>
          <div>
            <label for="cmessage" class="block text-gray-400 mb-2 font-medium">Message</label>
            <textarea id="cmessage" name="message" rows="5" required
                      class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-vertical"
                      placeholder="Your message here..."></textarea>
          </div>
          <button type="submit" id="submitBtn"
                  class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Send Message
          </button>
          <div id="formStatus" class="text-sm min-h-5"></div>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 py-12 border-t border-gray-800">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <a href="#hero" class="text-2xl font-bold gradient-text font-mono">&lt;cpnnabin/&gt;</a>
        <p class="text-gray-400 mt-2">Building the future with code and craftsmanship</p>
      </div>
      <nav class="flex flex-wrap gap-4 justify-center">
        <a href="#about"      class="text-gray-400 hover:text-blue-400 transition-colors px-2 py-1">About</a>
        <a href="#skills"     class="text-gray-400 hover:text-blue-400 transition-colors px-2 py-1">Skills</a>
        <a href="#projects"   class="text-gray-400 hover:text-blue-400 transition-colors px-2 py-1">Projects</a>
        <a href="#contact"    class="text-gray-400 hover:text-blue-400 transition-colors px-2 py-1">Contact</a>
      </nav>
      <div class="flex flex-wrap gap-3">
        <a href="https://linkedin.com/in/cpnnabin" target="_blank" aria-label="LinkedIn" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://x.com/cpnnabin" target="_blank" aria-label="X" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors"><i class="fab fa-x-twitter"></i></a>
        <a href="https://github.com/cpnnabin" target="_blank" aria-label="GitHub" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-gray-400 hover:bg-gray-700 transition-colors"><i class="fab fa-github"></i></a>
        <a href="https://facebook.com/cpnnabin" target="_blank" aria-label="Facebook" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-gray-700 transition-colors"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com/cpnnabin" target="_blank" aria-label="Instagram" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-pink-500 hover:bg-gray-700 transition-colors"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com/@cpnnabin" target="_blank" aria-label="YouTube" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-gray-700 transition-colors"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
      <p>&copy; <span id="currentYear"></span> Nabin Dhakal (cpnnabin). All rights reserved.</p>
      <p class="mt-2">Made with <i class="fas fa-heart text-red-500"></i> in Nepal</p>
    </div>
  </div>
</footer>

<!-- Back to top -->
<button id="backToTop" class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full hidden items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors z-50" aria-label="Back to top">
  <i class="fas fa-arrow-up"></i>
</button>

<!-- Notification -->
<div id="notification" class="notification glass-effect p-4 rounded-lg shadow-lg max-w-sm">
  <div class="flex items-center">
    <i id="notifIcon" class="fas fa-check-circle text-green-400 text-2xl mr-3"></i>
    <div>
      <p class="font-medium" id="notifTitle">Success!</p>
      <p class="text-sm text-gray-400" id="notifMsg">Message sent successfully.</p>
    </div>
  </div>
</div>

<script>
  // ── Data from D1 (injected server-side) ───────────────────
  const DB_PROJECTS   = ${projectsJSON};
  const DB_SKILLS     = ${skillsJSON};
  const DB_EDUCATION  = ${educationJSON};
  const DB_EXPERIENCE = ${experienceJSON};

  // ── Render Projects ────────────────────────────────────────
  function renderProjects() {
    const icons = ['fa-book','fa-shopping-cart','fa-industry','fa-globe','fa-code'];
    const colors = ['blue','purple','green','blue','purple'];
    const c = document.getElementById('projects-container');
    if (!DB_PROJECTS.length) { c.innerHTML = '<p class="text-gray-400 col-span-3 text-center">No projects yet.</p>'; return; }
    document.getElementById('proj-stat').textContent = DB_PROJECTS.length + '+';
    c.innerHTML = DB_PROJECTS.map((p, i) => {
      const col = colors[i % colors.length];
      const icon = icons[i % icons.length];
      const tags = (p.tech_stack || '').split(',').map(t =>
        \`<span class="px-3 py-1 bg-\${col}-600/10 text-\${col}-400 rounded-full text-sm font-medium">\${t.trim()}</span>\`
      ).join('');
      return \`
        <article class="glass-effect rounded-2xl overflow-hidden card-hover">
          <div class="p-6">
            <div class="w-12 h-12 bg-\${col}-600/10 rounded-lg flex items-center justify-center mb-4">
              <i class="fas \${icon} text-\${col}-400 text-xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">\${p.title}</h3>
            <p class="text-gray-400 mb-4 leading-relaxed">\${p.description || ''}</p>
            <div class="flex flex-wrap gap-2 mb-6">\${tags}</div>
            \${p.github_url ? \`<a href="\${p.github_url}" target="_blank" class="text-blue-400 font-medium hover:text-blue-300 inline-flex items-center transition-colors">View on GitHub <i class="fas fa-arrow-right ml-2"></i></a>\` : ''}
          </div>
        </article>\`;
    }).join('');
  }

  // ── Render Skills ──────────────────────────────────────────
  function renderSkills() {
    const grouped = DB_SKILLS.reduce((acc, s) => {
      (acc[s.category] = acc[s.category] || []).push(s); return acc;
    }, {});
    const catColors = { Backend:'blue', Database:'purple', Tools:'green', Leadership:'green', Frontend:'purple' };
    const catIcons  = { Backend:'fa-server', Database:'fa-database', Tools:'fa-tools', Leadership:'fa-chart-line', Frontend:'fa-code' };
    const c = document.getElementById('skills-container');
    c.innerHTML = Object.entries(grouped).map(([cat, skills]) => {
      const col  = catColors[cat]  || 'blue';
      const icon = catIcons[cat]   || 'fa-star';
      const bars = skills.map(s => \`
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-gray-400">\${s.name}</span>
            <span class="text-\${col}-400 font-medium">\${s.level}%</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div class="bg-\${col}-400 h-2 rounded-full skill-progress" style="--skill-width:\${s.level}%;width:0%" data-width="\${s.level}"></div>
          </div>
        </div>\`).join('');
      return \`
        <div class="glass-effect p-8 rounded-2xl card-hover skill-card">
          <div class="w-16 h-16 bg-\${col}-600/10 rounded-xl flex items-center justify-center mb-6">
            <i class="fas \${icon} text-\${col}-400 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-4">\${cat}</h3>
          <div class="space-y-4">\${bars}</div>
        </div>\`;
    }).join('');
  }

  // ── Animate skill bars on scroll ──────────────────────────
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-progress').forEach(b => {
          b.style.width = b.getAttribute('data-width') + '%';
          b.style.transition = 'width 1.5s ease-out';
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  // ── Render Education ───────────────────────────────────────
  function renderEducation() {
    const colors = ['blue','purple','green','blue','purple','green'];
    const icons  = ['fa-child','fa-book-open','fa-school','fa-atom','fa-code-branch','fa-graduation-cap'];
    const c = document.getElementById('education-container');
    c.innerHTML = \`
      <div class="space-y-6">
        \${DB_EDUCATION.map((e, i) => {
          const col = colors[i % colors.length];
          const ico = icons[i % icons.length];
          return \`
            <div class="glass-effect p-6 rounded-2xl flex flex-col sm:flex-row sm:items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-\${col}-600/10 rounded-lg flex items-center justify-center">
                <i class="fas \${ico} text-\${col}-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <h3 class="text-lg font-bold">\${e.degree}</h3>
                  <span class="text-gray-400 text-sm whitespace-nowrap">\${e.period || ''}</span>
                </div>
                <p class="text-\${col}-400 font-medium">\${e.institution}</p>
                <p class="text-gray-400 text-sm">\${e.location || ''}</p>
                <p class="text-gray-300 mt-1 text-sm">\${e.description || ''}</p>
              </div>
            </div>\`;
        }).join('')}
      </div>\`;
  }

  // ── Render Experience ──────────────────────────────────────
  function renderExperience() {
    const c = document.getElementById('experience-container');
    c.innerHTML = \`
      <div class="space-y-6">
        \${DB_EXPERIENCE.map(e => {
          const tags = (e.tags || '').split(',').map(t =>
            \`<span class="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-sm">\${t.trim()}</span>\`
          ).join('');
          return \`
            <div class="glass-effect p-6 rounded-2xl flex flex-col sm:flex-row sm:items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center">
                <i class="fas fa-briefcase text-blue-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <h3 class="text-lg font-bold">\${e.role}</h3>
                  <span class="text-gray-400 text-sm whitespace-nowrap">\${e.period || ''}</span>
                </div>
                <p class="text-blue-400 font-medium">\${e.company}</p>
                <p class="text-gray-400 text-sm">\${e.location || ''}</p>
                <p class="text-gray-300 mt-2 text-sm leading-relaxed">\${e.description || ''}</p>
                <div class="mt-3 flex flex-wrap gap-2">\${tags}</div>
              </div>
            </div>\`;
        }).join('')}
      </div>\`;
  }

  // ── Contact Form → /api/contact → D1 ──────────────────────
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn    = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const name    = document.getElementById('cname').value.trim();
    const email   = document.getElementById('cemail').value.trim();
    const subject = document.getElementById('csubject').value.trim();
    const message = document.getElementById('cmessage').value.trim();

    if (!name || name.length < 2)  { status.className='text-red-400'; status.textContent='Please enter your name.'; return; }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { status.className='text-red-400'; status.textContent='Please enter a valid email.'; return; }
    if (!message || message.length < 10) { status.className='text-red-400'; status.textContent='Message must be at least 10 characters.'; return; }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (res.ok) {
        status.className = 'text-green-400';
        status.textContent = '✅ Message sent! I will get back to you soon.';
        e.target.reset();
        showNotif('Success!', "Your message has been sent. I'll get back to you soon.", 'success');
      } else throw new Error(data.error || 'Something went wrong');
    } catch(err) {
      status.className = 'text-red-400';
      status.textContent = '❌ ' + err.message;
      showNotif('Error!', err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });

  function showNotif(title, msg, type) {
    document.getElementById('notifTitle').textContent = title;
    document.getElementById('notifMsg').textContent = msg;
    document.getElementById('notifIcon').className = type === 'success'
      ? 'fas fa-check-circle text-green-400 text-2xl mr-3'
      : 'fas fa-exclamation-circle text-red-400 text-2xl mr-3';
    const n = document.getElementById('notification');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 5000);
  }

  // ── Nav & scroll helpers ───────────────────────────────────
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  document.getElementById('menuBtn').addEventListener('click', () => {
    const m = document.getElementById('mobileMenu');
    const open = m.classList.toggle('hidden');
    document.getElementById('menuBtn').querySelector('i').className =
      open ? 'fas fa-bars text-2xl' : 'fas fa-times text-2xl';
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      document.getElementById('mobileMenu').classList.add('hidden');
      document.getElementById('menuBtn').querySelector('i').className = 'fas fa-bars text-2xl';
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const btn = document.getElementById('backToTop');
    y > 300 ? btn.classList.replace('hidden','flex') : btn.classList.replace('flex','hidden');
    document.getElementById('navbar').classList.toggle('bg-gray-900/90', y > 50);
  });

  document.getElementById('backToTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Init ───────────────────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('loading');
      l.style.opacity = '0';
      setTimeout(() => l.style.display = 'none', 500);
    }, 800);
  });

  renderProjects();
  renderSkills();
  renderEducation();
  renderExperience();

  // Observe skills for animation after render
  setTimeout(() => {
    const sc = document.getElementById('skills-container');
    if (sc) skillObs.observe(sc);
  }, 100);
</script>
</body>
</html>`;
}

// ── Worker ────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url    = new URL(request.url);
    const path   = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });

    // ── Serve HTML (data injected from D1) ────────────────────
    if (path === '/' || path === '/index.html') {
      const [projects, skills, education, experience] = await Promise.all([
        env.DB.prepare('SELECT * FROM projects ORDER BY created_at DESC').all(),
        env.DB.prepare('SELECT * FROM skills ORDER BY category, level DESC').all(),
        env.DB.prepare('SELECT * FROM education ORDER BY sort_order ASC').all(),
        env.DB.prepare('SELECT * FROM experience ORDER BY sort_order ASC').all(),
      ]);
      const html = buildHTML(
        projects.results,
        skills.results,
        education.results,
        experience.results
      );
      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=60' }
      });
    }


    // ── API: GET projects ─────────────────────────────────────
    if (path === '/api/projects' && method === 'GET') {
      // Match the order and fields as in index.html
      const { results } = await env.DB.prepare('SELECT id, title, description, tech_stack, github_url FROM projects ORDER BY id ASC').all();
      return json(results);
    }

    // ── API: GET skills ───────────────────────────────────────
    if (path === '/api/skills' && method === 'GET') {
      // Match the order and fields as in index.html
      const { results } = await env.DB.prepare('SELECT id, name, category, level FROM skills ORDER BY category, level DESC').all();
      return json(results);
    }

    // ── API: GET education ─────────────────────────────────---
    if (path === '/api/education' && method === 'GET') {
      // Match the order and fields as in index.html
      const { results } = await env.DB.prepare('SELECT id, degree, institution, location, period, description FROM education ORDER BY id ASC').all();
      return json(results);
    }

    // ── API: GET experience ─────────────────────────────────--
    if (path === '/api/experience' && method === 'GET') {
      // Match the order and fields as in index.html
      const { results } = await env.DB.prepare('SELECT id, role, company, location, period, description, tags FROM experience ORDER BY id ASC').all();
      return json(results);
    }

    // ── API: POST contact — saves to D1 ──────────────────────
    if (path === '/api/contact' && method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }
      const { name, email, subject, message } = body;
      if (!name || !email || !message) return err('name, email, and message are required');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Invalid email address');
      if (message.length > 2000) return err('Message too long (max 2000 chars)');
      await env.DB.prepare(
        'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)'
      ).bind(name, email, (subject ? `[${subject}] ` : '') + message).run();
      return json({ success: true, message: 'Message received!' });
    }

    // ── API: GET messages (admin protected) ───────────────────
    if (path === '/api/messages' && method === 'GET') {
      if (request.headers.get('Authorization') !== `Bearer ${env.ADMIN_SECRET}`)
        return err('Unauthorized', 401);
      const { results } = await env.DB.prepare(
        'SELECT * FROM contact_messages ORDER BY submitted_at DESC'
      ).all();
      return json(results);
    }

    // ── Health check ──────────────────────────────────────────
    if (path === '/api/health')
      return json({ ok: true, ts: new Date().toISOString() });

    return err('Not found', 404);
  }
};