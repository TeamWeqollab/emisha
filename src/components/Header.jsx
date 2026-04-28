import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (typeof document !== 'undefined' && document.body.classList.contains('dark-mode')) || (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDark) {
      document.body.classList.add('dark-mode');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      document.body.classList.remove('dark-mode');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  }, [isDark]);

  const handleOpenConsultation = (e) => {
    e.preventDefault();
    try {
      const offcanvasEl = typeof document !== 'undefined' ? document.getElementById('mobileMenu') : null;
      const bootstrap = typeof window !== 'undefined' ? window.bootstrap : undefined;
      if (offcanvasEl && bootstrap && bootstrap.Offcanvas) {
        const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
        instance.hide();
      }
      // Navigate to contact page after a short delay to allow offcanvas to close cleanly
      setTimeout(() => {
        router.push('/contact');
      }, 150);
    } catch {
      router.push('/contact');
    }
  };

  // Helper function to check if a main nav item is active
  const isMainNavActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  // Helper function to check if a sub nav item is active
  const isSubNavActive = (path) => {
    return router.asPath === path;
  };

  // Helper function to get active classes for main nav
  const getMainNavClasses = (path) => {
    const baseClasses = "nav-link";
    return isMainNavActive(path) ? `${baseClasses} active` : baseClasses;
  };

    // Helper function to get active classes for sub nav
  const getSubNavClasses = (path) => {
    const baseClasses = "dropdown-item";
    return isSubNavActive(path) ? `${baseClasses} active` : baseClasses;
  };
  


  // Helper function to get active classes for mobile nav
  // const getMobileNavClasses = (path) => {
  //   const baseClasses = "mobNavLink d-block py-2 text-decoration-none";
  //   return isMainNavActive(path) ? `${baseClasses.replace('mobNavLink', 'mobNavActive')}` : baseClasses;
  // };
  const getMobileNavClasses = (path) => {
  const baseClasses = "mobNavLink d-block py-2 text-decoration-none";

  // hash based link (/company#aboutus)
  if (path.includes("#")) {
    return router.asPath === path
      ? `${baseClasses.replace("mobNavLink", "mobNavActive")}`
      : baseClasses;
  }

  // normal route (/services/...)
  return router.pathname.startsWith(path)
    ? `${baseClasses.replace("mobNavLink", "mobNavActive")}`
    : baseClasses;
};



const closeOffcanvas = () => {
  try {
    const offcanvasEl = document.getElementById("mobileMenu");
    const bootstrap = window.bootstrap;

    if (offcanvasEl && bootstrap && bootstrap.Offcanvas) {
      const instance =
        bootstrap.Offcanvas.getInstance(offcanvasEl) ||
        new bootstrap.Offcanvas(offcanvasEl);
      instance.hide();
    }
  } catch (err) {
    console.log("Offcanvas close failed", err);
  }
};

useEffect(() => {
  closeOffcanvas();
}, [router.asPath]);


  
  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure offcanvas cleans up backdrop and closes on link click
  useEffect(() => {
    const offcanvasEl = typeof document !== 'undefined' ? document.getElementById('mobileMenu') : null;
    if (!offcanvasEl) return;

    const handleHidden = () => {
      const backdrops = document.querySelectorAll('.offcanvas-backdrop');
      backdrops.forEach((el) => el.remove());
      document.body.classList.remove('offcanvas-backdrop');
      document.body.style.overflow = '';
    };

    offcanvasEl.addEventListener('hidden.bs.offcanvas', handleHidden);

    const handleLinkClick = () => {
      // Close offcanvas when any link inside it is clicked
      try {
        const bootstrap = typeof window !== 'undefined' ? window.bootstrap : undefined;
        if (bootstrap && bootstrap.Offcanvas) {
          const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
          instance.hide();
        } else {
          // Fallback: trigger close button if bootstrap instance not available yet
          const closeBtn = offcanvasEl.querySelector('[data-bs-dismiss="offcanvas"]');
          if (closeBtn) closeBtn.click();
        }
      } catch {}
    };

    const links = offcanvasEl.querySelectorAll('a');
    links.forEach((a) => a.addEventListener('click', handleLinkClick));

    return () => {
      offcanvasEl.removeEventListener('hidden.bs.offcanvas', handleHidden);
      links.forEach((a) => a.removeEventListener('click', handleLinkClick));
    };
  }, []);

  return (
    <>
    <header>
     <h1 className="visually-hidden">Emisha Solutions</h1>
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isScrolled ? 'header-active' : 'header-transparent'}`}>
        <h2 className="visually-hidden">Site Navigation</h2>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image src={isScrolled ? "/images/logo.svg" : "/images/logo.svg"} alt="Emisha" width={124} height={72} className="img-fluid" />
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-block">
            <div className="mx-auto d-flex flex-row justify-content-center">
               <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className={getMainNavClasses('/services')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      SERVICES
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link href="/services/data-trust-transformation-services" className={getSubNavClasses('/services/data-trust-transformation-services')}><span className="dropdown-text">Data Trust & Transformation Services</span></Link></li>

                      <li><Link href="/services/foundation-services" className={getSubNavClasses('/services/foundation-services')}><span className="dropdown-text">Foundation Services</span></Link></li>

                      <li><Link href="/services/data-and-cyber-security" className={getSubNavClasses('/services/data-and-cyber-security')}><span className="dropdown-text">Data and Cyber Security</span></Link></li>

                      <li><Link href="/services/cloud-and-data-engineering" className={getSubNavClasses('/services/cloud-and-data-engineering')}><span className="dropdown-text">Cloud and Data Engineering</span></Link></li>
                    </ul>
                  </li>
                  {/* <li className="nav-item">
                    <Link href="/services/foundation-services" className={getMainNavClasses('/services')}>
                      SERVICES
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link href="/company" className={getMainNavClasses('/company')}>
                      COMPANY
                    </Link>
                  </li> */}
                  
                  <li className="nav-item dropdown">
                    <a className={getMainNavClasses('/company')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      COMPANY
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link href="/company#aboutus" className={getSubNavClasses('/company#aboutus')}><span className="dropdown-text">ABOUT US</span></Link></li>

                      <li><Link href="/company#careers" className={getSubNavClasses('/company#careers')}><span className="dropdown-text">CAREERS</span></Link></li>

                      <li><Link href="/company#partners" className={getSubNavClasses('/company#partners')}><span className="dropdown-text">PARTNERS</span></Link></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link href="/news" className={getMainNavClasses('/news')}>
                      NEWS
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link href="/company/about-us" className={getMainNavClasses('/company')}>
                      Company
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link href="/resources" className={getMainNavClasses('/resources')}>
                      RESOURCES
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link href="/contact" className="btn btn-primary btnHeader">CONTACT US</Link>
                  </li> */}
                </ul>
            </div>
          </div>

           {/* dark mode theme enable */}          
          <div className="d-none d-lg-block">
            <Link href="/contact" className="btn btn-primary btnHeader">CONTACT US</Link>
            {/* <button type="button" onClick={() => setIsDark(true)} aria-label="Activate dark mode" className="btn btn-link p-0 ms-4 theme-toggle-dark">
              <Image src="/images/icon-darkMode.svg" alt="Dark mode" width={37} height={38} className="img-fluid" />
            </button>
            <button type="button" onClick={() => setIsDark(false)} aria-label="Activate light mode" className="btn btn-link p-0 ms-2 theme-toggle-light">
              <Image src="/images/icon-lightMode.svg" alt="Light mode" width={38} height={38} className="img-fluid" />
            </button> */}
          </div>

          {/* Mobile Offcanvas Toggle Button */}
          <button className="btn btn-outline-light d-lg-none btn-bars" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>





      {/* Mobile Offcanvas Menu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
          {/* <div className="d-flex align-items-center">
            <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <span className="text-white fw-bold">P</span>
            </div>
            <h5 className="offcanvas-title text-white fw-bold" id="mobileMenuLabel">Emisha</h5>
          </div> */}
          <Link href="/">
            <Image src="/images/logo.svg" alt="Emisha" width={124} height={72} className="img-fluid" />
          </Link>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-canvasMobile">
          {/* <ul className="list-unstyled">
            <li className="mb-3">
              <Link href="/services/foundation-services" className={getMobileNavClasses('/services')}>
                SERVICES
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/company" className={getMobileNavClasses('/company')}>
                COMPANY
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/news" className={getMobileNavClasses('/news')}>
                NEWS
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/resources" className={getMobileNavClasses('/resources')}>
                RESOURCES
              </Link>
            </li>
          </ul> */}

          <div className="accordion" id="mobileAccordion">
            {/* SERVICES Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <div className="accordion-header" id="solutionsHeading">
                <button className="accordion-button bg-transparent border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#serviceCollapse" aria-expanded="false" aria-controls="serviceCollapse">
                  SERVICES
                </button>
              </div>
              <div id="serviceCollapse" className="accordion-collapse collapse" aria-labelledby="serviceHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-light">
                  <ul className="list-unstyled">
                    <li><Link href="/services/data-trust-transformation-services" className={getMobileNavClasses('/services/data-trust-transformation-services')}>Data Trust & Transformation Services</Link></li>

                    <li><Link href="/services/foundation-services" className={getMobileNavClasses('/services/foundation-services')}>Foundation Services</Link></li>

                    <li><Link href="/services/data-and-cyber-security" className={getMobileNavClasses('/services/data-and-cyber-security')}>Data and Cyber Security</Link></li>

                    <li><Link href="/services/cloud-and-data-engineering" className={getMobileNavClasses('/services/cloud-and-data-engineering')}>Cloud and Data Engineering</Link></li>
                  </ul>
                </div>
              </div>
            </div>

             {/* COMPANY Accordion */}
            <div className="accordion-item bg-transparent border-0">
              <div className="accordion-header" id="companyHeading">
                <button className="accordion-button bg-transparent border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#companyCollapse" aria-expanded="false" aria-controls="companyCollapse">
                  COMPANY
                </button>
              </div>
              <div id="companyCollapse" className="accordion-collapse collapse" aria-labelledby="companyHeading" data-bs-parent="#mobileAccordion">
                <div className="accordion-body bg-light">
                  <ul className="list-unstyled">
                    <li><Link href="/company#aboutus" className={getMobileNavClasses('/company#aboutus')}>About Us</Link></li>
                    <li><Link href="/company#careers" className={getMobileNavClasses('/company#careers')}>Careers</Link></li>
                    <li><Link href="/company#partners" className={getMobileNavClasses('/company#partners')}>Partners</Link></li>
                  </ul>
                </div>
              </div>
            </div>


            {/* NEWS Accordion */}
            {/* <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="newsHeading">
                <button className="accordion-button no-caret bg-transparent border-0 shadow-none" type="button" data-bs-toggle="collapsed" data-bs-target="#newsCollapse" aria-expanded="false" aria-controls="newsCollapse">
                  NEWS
                </button>
              </h2>
            </div> */}
            <div className="accordion-item bg-transparent border-0">
              <div className="accordion-header" id="newsHeading">
                <Link
                  href="/news"
                  onClick={closeOffcanvas}
                  className={`accordion-button no-caret bg-transparent border-0 shadow-none text-decoration-none ${
                    router.pathname === "/news" ? "mobNavActive" : ""
                  }`}
                >
                  NEWS
                </Link>
              </div>
            </div>

            {/* RESOURCES Accordion */}
            {/* <div className="accordion-item bg-transparent border-0">
              <h2 className="accordion-header" id="resourcesHeading">
                <button className="accordion-button no-caret bg-transparent border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#resourcesCollapse" aria-expanded="false" aria-controls="resourcesCollapse">
                  RESOURCES
                </button>
              </h2>
            </div> */}
            <div className="accordion-item bg-transparent border-0">
              <div className="accordion-header" id="resourcesHeading">
                <Link
                  href="/resources"
                  onClick={closeOffcanvas}
                  className={`accordion-button no-caret bg-transparent border-0 shadow-none text-decoration-none ${
                    router.pathname === "/resources" ? "mobNavActive" : ""
                  }`}
                >
                  RESOURCES
                </Link>
              </div>
            </div>

           
          </div>



          {/* Mobile Schedule Consultation Button gradient-border-top*/}
          <div className="mt-4 pt-2">
            {/* <Link 
              href="#"
              onClick={handleOpenConsultation}
              className="btn btn-outline-light w-100 py-3 btn-schedule-xs"
            >
              <i className="fas fa-calendar-alt me-2"></i>CONTACT US
            </Link> */}
             <Link href="/contact" className="btn btn-primary btnHeader">
              CONTACT US
            </Link>
          </div>

          {/* Mobile Social Links */}
          {/* <div className="mt-4 text-center">
            <p className="text-white-50 mb-3">Follow Us</p>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="social-link twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-link instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link linkedin"><i className="fab fa-linkedin"></i></a>
            </div>
          </div> */}
        </div>
      </div>

      </header>
    </>
  );
}
