import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenConsultation = (e) => {
    e.preventDefault();
    try {
      const offcanvasEl = typeof document !== 'undefined' ? document.getElementById('mobileMenu') : null;
      const bootstrap = typeof window !== 'undefined' ? window.bootstrap : undefined;
      if (offcanvasEl && bootstrap && bootstrap.Offcanvas) {
        const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
        instance.hide();
      }
      // Open the contact modal after a short delay to allow offcanvas to close cleanly
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.openContactModal) {
          window.openContactModal();
        }
      }, 150);
    } catch {
      if (typeof window !== 'undefined' && window.openContactModal) {
        window.openContactModal();
      }
    }
  };

  // Helper function to check if a main nav item is active
  const isMainNavActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  // Helper function to get active classes for main nav
  const getMainNavClasses = (path) => {
    const baseClasses = "nav-link";
    return isMainNavActive(path) ? `${baseClasses} active` : baseClasses;
  };

  // Helper function to get active classes for mobile nav
  const getMobileNavClasses = (path) => {
    const baseClasses = "text-white-50 d-block py-2 text-decoration-none";
    return isMainNavActive(path) ? `${baseClasses.replace('text-white-50', 'mobNavActive fw-bold')}` : baseClasses;
  };

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
     <h1 className="d-none">Emisha Solutions</h1>
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isScrolled ? 'header-active' : 'header-transparent'}`}>
        <h2 className="d-none">Site Navigation</h2>
        <div className="container">
         
          <Link href="/" className="navbar-brand">
            <Image src={isScrolled ? "/images/logo.svg" : "/images/logo.svg"} alt="Emisha" width={124} height={72} className="img-fluid" />
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-block">
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item">
                <Link href="/solutions" className={getMainNavClasses('/solutions')}>
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/technology" className={getMainNavClasses('/technology')}>
                  COMPANY
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/services" className={getMainNavClasses('/services')}>
                  NEWS
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link href="/company/about-us" className={getMainNavClasses('/company')}>
                  Company
                </Link>
              </li> */}
              <li className="nav-item">
                <Link href="/customer-stories" className={getMainNavClasses('/customer-stories')}>
                  RESOURCES
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="btn btn-outline-light btnHeader">CONTACT US</Link>
              </li>
              {/* <li className="nav-item ms-3">
                <Link href="#" onClick={handleOpenConsultation} className="btn btn-outline-light btnHeader">
                  <span>Schedule Consultation</span>
                </Link>
              </li> */}
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
          {/* <div className="d-flex align-items-center">
            <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <span className="text-white fw-bold">P</span>
            </div>
            <h5 className="offcanvas-title text-white fw-bold" id="mobileMenuLabel">Emisha</h5>
          </div> */}
          <Link href="/">
            <Image src="/images/logo.svg" alt="Emisha" width={124} height={72} className="img-fluid" />
          </Link>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link href="/solutions" className={getMobileNavClasses('/solutions')}>
                <i className="fas fa-cogs me-2"></i>SERVICES
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/technology" className={getMobileNavClasses('/technology')}>
                <i className="fas fa-microchip me-2"></i>COMPANY
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/services" className={getMobileNavClasses('/services')}>
                <i className="fas fa-tools me-2"></i>NEWS
              </Link>
            </li>
            {/* <li className="mb-3">
              <Link href="/company/about-us" className={getMobileNavClasses('/company')}>
                  <i className="fas fa-building me-2"></i>Company
              </Link>
            </li> */}
            <li className="mb-3">
              <Link href="/customer-stories" className={getMobileNavClasses('/customer-stories')}>
                <i className="fas fa-users me-2"></i>Resources
              </Link>
            </li>
          </ul>

          {/* Mobile Schedule Consultation Button */}
          <div className="mt-4 pt-4 border-top border-secondary">
            <Link 
              href="#"
              onClick={handleOpenConsultation}
              className="btn btn-outline-light w-100 py-3 btn-schedule-xs"
            >
              <i className="fas fa-calendar-alt me-2"></i>CONTACT US
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
    </>
  );
}
