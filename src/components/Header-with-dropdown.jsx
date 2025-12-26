import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  
  // Helper function to check if a main nav item is active
  const isMainNavActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };
  
  // Helper function to check if a sub nav item is active
  const isSubNavActive = (path) => {
    return router.pathname === path;
  };
  
  // Helper function to get active classes for main nav
  const getMainNavClasses = (path) => {
    const baseClasses = "nav-link text-white dropdown-toggle";
    return isMainNavActive(path) ? `${baseClasses} active` : baseClasses;
  };
  
  // Helper function to get active classes for sub nav
  const getSubNavClasses = (path) => {
    const baseClasses = "dropdown-item";
    return isSubNavActive(path) ? `${baseClasses} active` : baseClasses;
  };
  
  // Helper function to get active classes for mobile nav
  const getMobileNavClasses = (path) => {
    const baseClasses = "text-white-50 d-block py-2 text-decoration-none";
    return isSubNavActive(path) ? `${baseClasses.replace('text-white-50', 'text-danger fw-bold')}` : baseClasses;
  };
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <span className="text-white fw-bold">P</span>
            </div>
            <span className="text-white fw-bold">EMISHA Interactive</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="d-none d-lg-block">
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item dropdown me-3">
                <a className={getMainNavClasses('/solutions')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Solutions
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link href="/solutions/custom-enterprise-applications" className={getSubNavClasses('/solutions/custom-enterprise-applications')}>Custom Enterprise Applications</Link></li>
                  <li><Link href="/solutions/operational-intelligence-platforms" className={getSubNavClasses('/solutions/operational-intelligence-platforms')}>Operational Intelligence Platforms</Link></li>
                  <li><Link href="/solutions/management-information-systems" className={getSubNavClasses('/solutions/management-information-systems')}>Management Information Systems (MIS)</Link></li>
                  <li><Link href="/solutions/business-intelligence-analytics" className={getSubNavClasses('/solutions/business-intelligence-analytics')}>Business Intelligence & Analytics</Link></li>
                  <li><Link href="/solutions/enterprise-data-integration" className={getSubNavClasses('/solutions/enterprise-data-integration')}>Enterprise Data Integration</Link></li>
                  <li><Link href="/solutions/decision-support-systems" className={getSubNavClasses('/solutions/decision-support-systems')}>Decision Support Systems</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/solutions" className={getSubNavClasses('/solutions')}>All Solutions</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a className={getMainNavClasses('/technology')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Technology
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link href="/technology/microsoft-technologies" className={getSubNavClasses('/technology/microsoft-technologies')}>Microsoft Technologies</Link></li>
                  <li><Link href="/technology/react-modern-frontend" className={getSubNavClasses('/technology/react-modern-frontend')}>React & Modern Frontend</Link></li>
                  <li><Link href="/technology/postgresql-databases" className={getSubNavClasses('/technology/postgresql-databases')}>PostgreSQL & Databases</Link></li>
                  <li><Link href="/technology/cloud-solutions" className={getSubNavClasses('/technology/cloud-solutions')}>Cloud Solutions</Link></li>
                  <li><Link href="/technology/api-integration" className={getSubNavClasses('/technology/api-integration')}>API Integration</Link></li>
                  <li><Link href="/technology/mobile-development" className={getSubNavClasses('/technology/mobile-development')}>Mobile Development</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/technology" className={getSubNavClasses('/technology')}>Technology Stack</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a className={getMainNavClasses('/services')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link href="/services/ios-app-development" className={getSubNavClasses('/services/ios-app-development')}>iOS App Development</Link></li>
                  <li><Link href="/services/android-app-development" className={getSubNavClasses('/services/android-app-development')}>Android App Development</Link></li>
                  <li><Link href="/services/software-development" className={getSubNavClasses('/services/software-development')}>Software Development</Link></li>
                  <li><Link href="/services/ui-ux-design" className={getSubNavClasses('/services/ui-ux-design')}>UI/UX & Design</Link></li>
                  <li><Link href="/services/mobile-app-development" className={getSubNavClasses('/services/mobile-app-development')}>Mobile App Development</Link></li>
                  <li><Link href="/services/research-innovation" className={getSubNavClasses('/services/research-innovation')}>Research & Innovation</Link></li>
                  <li><Link href="/services/digital-transformation" className={getSubNavClasses('/services/digital-transformation')}>Digital Transformation</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/services/consulting-services" className={getSubNavClasses('/services/consulting-services')}>Consulting Services</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a className={getMainNavClasses('/company')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Company
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link href="/company/about-us" className={getSubNavClasses('/company/about-us')}>About Us</Link></li>
                  <li><Link href="/company/our-team" className={getSubNavClasses('/company/our-team')}>Our Team</Link></li>
                  <li><Link href="/company/careers" className={getSubNavClasses('/company/careers')}>Careers</Link></li>
                  <li><Link href="/company/case-studies" className={getSubNavClasses('/company/case-studies')}>Case Studies</Link></li>
                  <li><Link href="/company/client-success-stories" className={getSubNavClasses('/company/client-success-stories')}>Client Success Stories</Link></li>
                  <li><Link href="/company/partnerships" className={getSubNavClasses('/company/partnerships')}>Partnerships</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/contact" className={getSubNavClasses('/contact')}>Contact Us</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="btn btn-outline-light border-white text-white px-4">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Mobile Offcanvas Toggle Button */}
          <button className="btn btn-outline-light d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header bg-dark">
          <div className="d-flex align-items-center">
            <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <span className="text-white fw-bold">P</span>
            </div>
            <h5 className="offcanvas-title text-white fw-bold" id="mobileMenuLabel">EMISHA Interactive</h5>
          </div>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <div className="accordion" id="mobileAccordion">
            {/* Solutions Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="solutionsHeading">
                <button className="accordion-button bg-transparent text-white border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#solutionsCollapse" aria-expanded="false" aria-controls="solutionsCollapse">
                  <i className="fas fa-cogs me-2"></i>Solutions
                </button>
              </h2>
              <div id="solutionsCollapse" className="accordion-collapse collapse" aria-labelledby="solutionsHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-dark">
                  <ul className="list-unstyled">
                    <li><Link href="/solutions/custom-enterprise-applications" className={getMobileNavClasses('/solutions/custom-enterprise-applications')}><i className="fas fa-building me-2"></i>Custom Enterprise Applications</Link></li>
                    <li><Link href="/solutions/operational-intelligence-platforms" className={getMobileNavClasses('/solutions/operational-intelligence-platforms')}><i className="fas fa-bullseye me-2"></i>Operational Intelligence Platforms</Link></li>
                    <li><Link href="/solutions/management-information-systems" className={getMobileNavClasses('/solutions/management-information-systems')}><i className="fas fa-chart-line me-2"></i>Management Information Systems (MIS)</Link></li>
                    <li><Link href="/solutions/business-intelligence-analytics" className={getMobileNavClasses('/solutions/business-intelligence-analytics')}><i className="fas fa-chart-bar me-2"></i>Business Intelligence & Analytics</Link></li>
                    <li><Link href="/solutions/enterprise-data-integration" className={getMobileNavClasses('/solutions/enterprise-data-integration')}><i className="fas fa-project-diagram me-2"></i>Enterprise Data Integration</Link></li>
                    <li><Link href="/solutions/decision-support-systems" className={getMobileNavClasses('/solutions/decision-support-systems')}><i className="fas fa-lightbulb me-2"></i>Decision Support Systems</Link></li>
                    <li><hr className="text-white-25" /></li>
                    <li><Link href="/solutions" className={getMobileNavClasses('/solutions')}><i className="fas fa-th-large me-2"></i>All Solutions</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technology Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="technologyHeading">
                <button className="accordion-button bg-transparent text-white border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#technologyCollapse" aria-expanded="false" aria-controls="technologyCollapse">
                  <i className="fas fa-microchip me-2"></i>Technology
                </button>
              </h2>
              <div id="technologyCollapse" className="accordion-collapse collapse" aria-labelledby="technologyHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-dark">
                  <ul className="list-unstyled">
                    <li><Link href="/technology/microsoft-technologies" className={getMobileNavClasses('/technology/microsoft-technologies')}><i className="fab fa-microsoft me-2"></i>Microsoft Technologies</Link></li>
                    <li><Link href="/technology/react-modern-frontend" className={getMobileNavClasses('/technology/react-modern-frontend')}><i className="fab fa-react me-2"></i>React & Modern Frontend</Link></li>
                    <li><Link href="/technology/postgresql-databases" className={getMobileNavClasses('/technology/postgresql-databases')}><i className="fas fa-database me-2"></i>PostgreSQL & Databases</Link></li>
                    <li><Link href="/technology/cloud-solutions" className={getMobileNavClasses('/technology/cloud-solutions')}><i className="fas fa-cloud me-2"></i>Cloud Solutions</Link></li>
                    <li><Link href="/technology/api-integration" className={getMobileNavClasses('/technology/api-integration')}><i className="fas fa-plug me-2"></i>API Integration</Link></li>
                    <li><Link href="/technology/mobile-development" className={getMobileNavClasses('/technology/mobile-development')}><i className="fas fa-mobile-alt me-2"></i>Mobile Development</Link></li>
                    <li><hr className="text-white-25" /></li>
                    <li><Link href="/technology" className={getMobileNavClasses('/technology')}><i className="fas fa-layer-group me-2"></i>Technology Stack</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="servicesHeading">
                <button className="accordion-button bg-transparent text-white border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#servicesCollapse" aria-expanded="false" aria-controls="servicesCollapse">
                  <i className="fas fa-tools me-2"></i>Services
                </button>
              </h2>
              <div id="servicesCollapse" className="accordion-collapse collapse" aria-labelledby="servicesHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-dark">
                  <ul className="list-unstyled">
                    <li><Link href="/services/ios-app-development" className={getMobileNavClasses('/services/ios-app-development')}><i className="fab fa-apple me-2"></i>iOS App Development</Link></li>
                    <li><Link href="/services/android-app-development" className={getMobileNavClasses('/services/android-app-development')}><i className="fab fa-android me-2"></i>Android App Development</Link></li>
                    <li><Link href="/services/software-development" className={getMobileNavClasses('/services/software-development')}><i className="fas fa-code me-2"></i>Software Development</Link></li>
                    <li><Link href="/services/ui-ux-design" className={getMobileNavClasses('/services/ui-ux-design')}><i className="fas fa-palette me-2"></i>UI/UX & Design</Link></li>
                    <li><Link href="/services/mobile-app-development" className={getMobileNavClasses('/services/mobile-app-development')}><i className="fas fa-mobile-alt me-2"></i>Mobile App Development</Link></li>
                    <li><Link href="/services/research-innovation" className={getMobileNavClasses('/services/research-innovation')}><i className="fas fa-flask me-2"></i>Research & Innovation</Link></li>
                    <li><Link href="/services/digital-transformation" className={getMobileNavClasses('/services/digital-transformation')}><i className="fas fa-sync-alt me-2"></i>Digital Transformation</Link></li>
                    <li><hr className="text-white-25" /></li>
                    <li><Link href="/services/consulting-services" className={getMobileNavClasses('/services/consulting-services')}><i className="fas fa-handshake me-2"></i>Consulting Services</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Company Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="companyHeading">
                <button className="accordion-button bg-transparent text-white border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#companyCollapse" aria-expanded="false" aria-controls="companyCollapse">
                  <i className="fas fa-building me-2"></i>Company
                </button>
              </h2>
              <div id="companyCollapse" className="accordion-collapse collapse" aria-labelledby="companyHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-dark">
                  <ul className="list-unstyled">
                    <li><Link href="/company/about-us" className={getMobileNavClasses('/company/about-us')}><i className="fas fa-info-circle me-2"></i>About Us</Link></li>
                    <li><Link href="/company/our-team" className={getMobileNavClasses('/company/our-team')}><i className="fas fa-users me-2"></i>Our Team</Link></li>
                    <li><Link href="/company/careers" className={getMobileNavClasses('/company/careers')}><i className="fas fa-briefcase me-2"></i>Careers</Link></li>
                    <li><Link href="/company/case-studies" className={getMobileNavClasses('/company/case-studies')}><i className="fas fa-file-alt me-2"></i>Case Studies</Link></li>
                    <li><Link href="/company/client-success-stories" className={getMobileNavClasses('/company/client-success-stories')}><i className="fas fa-trophy me-2"></i>Client Success Stories</Link></li>
                    <li><Link href="/company/partnerships" className={getMobileNavClasses('/company/partnerships')}><i className="fas fa-handshake me-2"></i>Partnerships</Link></li>
                    <li><hr className="text-white-25" /></li>
                    <li><Link href="/contact" className={getMobileNavClasses('/contact')}><i className="fas fa-envelope me-2"></i>Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Contact Button */}
          <div className="mt-4 pt-4 border-top border-secondary">
            <Link href="/contact" className="btn btn-outline-light w-100 py-3">
              <i className="fas fa-phone me-2"></i>Contact Us
            </Link>
          </div>

          {/* Mobile Social Links */}
          <div className="mt-4 text-center">
            <h6 className="text-white-50 mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white-50 fs-4"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white-50 fs-4"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white-50 fs-4"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
