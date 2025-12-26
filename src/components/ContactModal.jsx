import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

// Validation schema using Yup
const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required")
    .length(10, "Phone must be exactly 10 digits"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
  company: Yup.string().required("Company name is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactModal() {

  // console.log('EmailJS ENV CHECK:', {
  //   serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  //   templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  //   publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  // });


  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with public key (safe on client)
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;
      if (publicKey && !isInit) {
        emailjs.init({ publicKey });
        setIsInit(true);
      }
    } catch { }

    // Global method to open modal from anywhere
    if (typeof window !== 'undefined') {
      window.openContactModal = () => {
        setShow(true);
        // Close mobile menu if open
        const mobileMenuEl = document.getElementById('mobileMenu');
        if (mobileMenuEl) {
          const bootstrap = window.bootstrap;
          if (bootstrap && bootstrap.Offcanvas) {
            const instance = bootstrap.Offcanvas.getInstance(mobileMenuEl);
            if (instance) {
              instance.hide();
            }
          }
        }
      };
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    setStatus(""); // Reset status when modal closes
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Schedule a Consultation</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            company: "",
            message: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
              console.error("EmailJS environment variables are missing:", { serviceId, templateId, publicKey });
              setStatus("❌ Email service not configured. Please try again later.");
              setSubmitting(false);
              return;
            }

            try {
              const response = await emailjs.send(
                serviceId,
                templateId,
                {
                  name: values.name,
                  company: values.company,
                  phone: values.phone,
                  email: values.email,
                  message: values.message,
                },
                publicKey
              );

              console.log("EmailJS success:", response);
              setStatus("✅ Message sent successfully!");
              resetForm();
              setTimeout(() => handleClose(), 2000);
            } catch (error) {
              console.error("EmailJS Error:", error);
              setStatus("❌ Failed to send. Please try again later.");
            } finally {
              setSubmitting(false);
            }
          }}

        >
          {({ isSubmitting }) => (
            <Form className="row g-4 ps-2 pe-2">
              {/* <div className="col-12 text-center"><b>Schedule a Consultation</b></div> */}
              {/* Name */}
              <div className="col-md-12">
                <label className="form-label">Your Name <span className="text-danger">*</span></label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
              </div>

              {/* Phone */}
              <div className="col-md-12">
                <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                <Field
                  name="phone"
                  className="form-control"
                  maxLength="10"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                /> 
                <ErrorMessage name="phone" component="div" className="text-danger small" />
              </div>

              {/* Email */}
              <div className="col-md-12">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              {/* Company */}
              <div className="col-md-12">
                <label className="form-label">Company Name <span className="text-danger">*</span></label>
                <Field name="company" className="form-control" />
                <ErrorMessage name="company" component="div" className="text-danger small" />
              </div>

              {/* Message */}
              <div className="col-12">
                <label className="form-label">Your Message <span className="text-danger">*</span></label>
                <Field as="textarea" name="message" className="form-control" rows="4" />
                <ErrorMessage name="message" component="div" className="text-danger small" />
              </div>

              {/* Submit */}
              <div className="col-12 text-center mt-4 mb-4">
                <button
                  type="submit"
                  className="btn btn-submit-contact btn-lg px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              {status && (
                <div className="col-12 text-center mt-3">
                  <p>{status}</p>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

