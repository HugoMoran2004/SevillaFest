import juntaAndalucia from "../assets/images/juntaAndalucialogo.png";
import cutystark from "../assets/images/cutystark.png";
import negrita from "../assets/images/negrita.png";
import logoCruzcampo from "../assets/images/cruzcampo.png";

const Footer = () => {
  const logos = [juntaAndalucia, cutystark, negrita, logoCruzcampo];

  return (
    <footer style={{ backgroundColor: "#117a65", color: "white", textAlign: "center", padding: "20px 0" }}>
      {/* Logos de Marcas */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          {logos.map((logo, index) => (
            <div key={index} className="col-md-2">
              <img src={logo} alt={`Logo ${index + 1}`} className="img-fluid" />
            </div>
          ))}
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="container p-4 pb-0">
        <section className="mb-4">
          {[
            { href: "#", color: "#3b5998", icon: "facebook-f" },
            { href: "#", color: "#55acee", icon: "twitter" },
            { href: "#", color: "#dd4b39", icon: "google" },
            { href: "#", color: "#ac2bac", icon: "instagram" },
            { href: "#", color: "#0082ca", icon: "linkedin-in" },
            { href: "#", color: "#333333", icon: "github" },
          ].map((social, index) => (
            <a key={index} className="btn btn-floating m-1" style={{ backgroundColor: social.color }} href={social.href} role="button">
              <i className={`fab fa-${social.icon}`}></i>
            </a>
          ))}
        </section>
      </div>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "#138d75", color: "black" }}>
        &copy; 2024 Copyright: <a className="text-dark" href="https://tuweb.com/">TuWeb.com</a>
      </div>
    </footer>
  );
};

export default Footer;
