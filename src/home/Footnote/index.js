import React from 'react';

const Footnote = () => {
  return (
      <div className="container mt-5 me-0 pe-0">
        <div className="text-center text-lg-start text-black" style={{ backgroundColor: 'lightpink' }}>
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-1 mb-md-0">
                <div className="shadow-1-strong d-flex align-items-center justify-content-center mb-2 mx-auto" style={{ width: '100px', height: '100px' }}>
                  <img className="rounded-circle" src="../../img/icon.png" height="75" alt=""/>
                </div>
                <div className="text-center mr-2">A dog social media website, a platform dedicated to connecting dog owners, dog lovers, and third-party service providers. </div>
                <ul className="list-unstyled d-flex flex-row justify-content-center">
                  <li>
                    <a className="text-black px-2" href="#!">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-black px-2" href="#!">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-black ps-2" href="#!">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mt-5 mb-1 mb-md-0">
                <h5 className="text-uppercase mb-4">Dogs</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#!" className="text-black"><i className="fas fa-paw pe-3"></i>Dog training</a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-black"><i className="fas fa-paw pe-3"></i>Dog hospital</a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-black"><i className="fas fa-paw pe-3"></i>Dog events</a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-black"><i className="fas fa-paw pe-3"></i>Dog store</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mt-5 mb-1 mb-md-0">
                <h5 className="text-uppercase mb-4">About</h5>

                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="/home" className="text-black"><i className="fas fa-paw pe-3"></i>General information</a>
                  </li>
                  <li className="mb-2">
                    <a href="/about" className="text-black"><i className="fas fa-paw pe-3"></i>About us</a>
                  </li>
                  <li className="mb-2">
                    <a href="#!" className="text-black"><i className="fas fa-paw pe-3"></i>Job</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 mt-5 mb-1 mb-md-0">
                <h5 className="text-uppercase mb-4">Contact</h5>
                <ul className="list-unstyled">
                  <li>
                    <p><i className="fas fa-map-marker-alt pe-2"></i>Northeastern University, World</p>
                  </li>
                  <li>
                    <p><i className="fas fa-phone pe-2"></i>+ 01 561 056 10</p>
                  </li>
                  <li>
                    <p><i className="fas fa-envelope pe-2 mb-0"></i>contact@dogland.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center text-black mt-4 mb-1" style={{ backgroundColor: 'lightpink' }}>
              <p className="text-black" href="#">© 2023 Copyright: dogland.com</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Footnote;