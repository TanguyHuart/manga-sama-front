import './Loader.scss';

function Loader() {
  return (
    <div className="loader">
      <div className="loader__container">
        <img
          className="loader__gif"
          src="/assets/logo/poulpe.gif"
          alt="poulpegif"
        />
        <p className="loader__text">Chargement en cours...</p>
      </div>
    </div>
  );
}

export default Loader;
