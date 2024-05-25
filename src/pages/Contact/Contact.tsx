import telephoneImage from "../../assets/telephone.png";

const Contact = () => {
  return (
    <div>
      <div className="h-full bg-red-100 flex item-center justify-center mx-auto">
        <h1 className="mb-4 mt-5 text-4xl font-extrabold leading-none tracking-tight text-fuchsia-600 md:text-5xl lg:text-6xl dark:text-white ">
          CONTACT US
        </h1>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg object-scale-down h-40 w-88  object-center"
            src={telephoneImage}
            alt=""
          />
        </a>

        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
