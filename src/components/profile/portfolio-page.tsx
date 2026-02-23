import Image from "next/image";

function PortfolioPageV() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      <div className="rounded-2xl bg-white p-6 shadow-lg border border-[#c5c5c5]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <Image
              src="/assets/mockup3.svg"
              alt="Mockup"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-xl bg-gray-100"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold">The Bunters: A Journey Home</h2>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">
                This project is a real estate website where users can browse
                rental properties. You can check it out here:
                <a
                  href="https://real-estate-react-project-three.vercel.app/"
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://real-estate-react-project-three.vercel.app/
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Key Features:</h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  - The website has smooth animations and transitions, making it
                  visually appealing and easy to use.
                </li>
                <li>
                  - It is designed to be user-friendly, providing a seamless
                  experience whether you&apos;re on a computer or a mobile
                  device.
                </li>
                <li>
                  - On the Rent page, you can filter properties based on
                  different criteria to find the best match for your needs.
                </li>
                <li>
                  - The overall design is clean and modern, making it easy to
                  navigate and find information quickly.
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-medium mb-1">Duration</h3>
                <p className="text-gray-600">1 - 7 weeks</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Price</h3>
                <p className="text-gray-600">₹8,000 - ₹12,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPageV;
