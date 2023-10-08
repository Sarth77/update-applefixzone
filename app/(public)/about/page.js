import { EmailSvg, LocationSvg, PhoneSvg } from "@/public/svg/svgImage";

const AboutUs = () => {
    return (
        <div className="max-w-[90%] mx-auto">
            <section className="bg-white dark:bg-gray-400">
                <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
                    <div>
                        <h3 className=" text-2xl font-medium text-blue-500 dark:text-blue-400">
                            About us
                        </h3>
                        <ul className="my-4 gap-2 text-gray-600">
                            <li>
                                Welcome to AppleFixZone, your number one source for all things
                                Mobile Spares and accessories. We&apos;re dedicated to providing you
                                the best of Mobile Spares and accessories, with a focus on
                                dependability.
                            </li>
                            <li>
                                We are Providing Original iPhone Spares, iPhone Displays, iPhone
                                Charging Port, iPad Original Spares, iPhone Batteries, iPhone
                                Motherboard, iPhone GX Display, iPhone OCA Glass and OCA Sheets.
                            </li>
                            <li>
                                We&apos;re working to turn our passion for Mobile Spares and
                                accessories into a booming online store. We hope you enjoy our
                                products as much as we enjoy offering them to you.
                            </li>
                        </ul>

                        <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                            Get in touch
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <EmailSvg className={"w-6 h-6"} />
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                                Email
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Our friendly team is here to help.
                            </p>
                            <a
                                href="mailto:support@applefixzone.com"
                                className="mt-2 text-blue-500 dark:text-blue-400"
                            >
                                support@applefixzone.com
                            </a>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <LocationSvg className={"w-6 h-6"} />
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                                Office
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Come say hello at our office HQ.
                            </p>
                            <a href="#" className="mt-2 text-blue-500 dark:text-blue-400">
                                AppleFixZone Noida Uttar Pradesh 201301 IN
                            </a>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <PhoneSvg className={"w-6 h-6"} />
                            </span>

                            <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                                Whatsapp
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Mon-Fri from 9am to 5pm.
                            </p>
                            <a
                                href="tel:+919711724470"
                                className="mt-2 text-blue-500 dark:text-blue-400"
                            >
                                +91 (971) 712-4470
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
