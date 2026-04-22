
import { Buttons } from "$lib";
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	
	interface Work {
		title: string;
		slug: string;
		published: { is: boolean; date: string };
		description: string;
		assets: { image: string[]; icon?: string; color?: string };
		link: { src: string; showType: '' | 'mobile' | 'desktop' | 'none' };
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{ text?: string[]; images?: string[]; h2?: string }>;
		collaborators?: Record<string, string>;
		tags?: string[];
		m5?:(filenumber : number) => void;
	}

	let dataWorks: any[] = [
		{ pagination: 'none' },
		{
			works: [
				//TILE SHIFTING 
				{
					title: 'tile shifting',
					slug: 'Grid experiment',
					published: { is: true, date: '' },
					description:
						'An experimentation I did to test out grid animation that in the future was used as an animatable grid layout. The idea was to have a grid of tiles that shift their position when hovered, creating a dynamic and interactive visual effect. The shifting is achieved through CSS transitions, allowing the tiles to smoothly move to new positions within the grid when the user interacts with them.',
					assets: { image: [''], icon: '', color: 'pink' },
					contentBlock: [
							{
								text:['An experimentation I did to test out grid animation that in the future was used as an animatable grid layout. The idea was to have a grid of tiles that shift their position when hovered, creating a dynamic and interactive visual effect. The shifting is achieved through CSS transitions, allowing the tiles to smoothly move to new positions within the grid when the user interacts with them.'],
							},
							// {
							// 	html:[`
							// 		<iframe height="700" style="width: 100%;" scrolling="no" title="grid test" src="https://codepen.io/Christopher-the-animator/embed/NWoeXRo?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true">
							// 		See the Pen <a href="https://codepen.io/Christopher-the-animator/pen/NWoeXRo">
							// 		grid test</a> by Christopher (<a href="https://codepen.io/Christopher-the-animator">@Christopher-the-animator</a>)
							// 		on <a href="https://codepen.io">CodePen</a>.
							// 		</iframe>
							// 	`],
							// },
							{
								html:["<Buttons />"],
							},
							{
								html:[`<button data-open-file="3">...</button>`],
							},
						],
					collaborators: {
						owner: 'Christopher'
					},
					tags: ['Experiment', 'Grid Motion', 'responsive design'],

					link: { src: 'https://codepen.io/Christopher-the-animator/pen/NWoeXRo', showType: '' },
					dateStart: '2023',
					dateEnd: '2023',
					status: { is: 'experiment', sticker: '' }
				},
				// WINDOWS
				{
					title: 'windows',
					slug: 'School project',
					published: { is: true, date: '' },
					// description: 'I got to create a profile card that showcased my understanding of the web fundamentals in the form of a profilecard. I took this opportunity to experiemnt with toen die tijd the new popover api and styled it in the look and feel of the Windows XP interface.',
					assets: {
						image: [
							'25acb22a-22a3-41d5-a0eb-c91529c4c6c8.avif',
							'chris icon lowlowres.avif',
							'works-assets/chris landing page portfolio ideas-02.avif'
						],
						icon: '/works-assets/windows/pngwing.com.avif',
						// color: 'skyblue'
						color:'#94c5f8',
					},
					contentBlock: [
						{
							text: [
								// 'I created a profile card that showcased my understanding of some web fundamentals. I took this opportunity to experiment with the new <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">popover api</a> and styled it in the look and feel of the Windows XP interface.'
								'I created a profile card that showcased my understanding of some web fundamentals using <a target="_blank" href="https://www.npmjs.com/package/ejs">ejs</a>, and styled it in the look and feel of the Windows XP interface.'
							]
						},
						{
							images: ['./works-assets/windows/chrome_KDKznicEhK.gif']
						},
						{
							images: [
								'/works-assets/windows/Recording 2026-03-02 022626.gif',
								'/works-assets/windows/chrome_hh5Wv4h7nO.gif',
								'/works-assets/windows/pngwing.com.avif'
							]
						},
						{
							text:['I took this opportunity to experiment with "at that time" new web features:'],
							html: [`
							<ul class="flat-list">
								<li>Popover Api</li>
								<li>Anchor Api</li>
								<li>Iframes</li>
								<li>Embed</li>
								<li>Clip-mask</li>
								<li>Preferred color scheme </li>
								<li>Dynamic grid </li>
							</ul>
								`
							]
						},
						{
							text: [
								'- The <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">Popover Api</a> was a natural fit, since it handles component toggling and window coordinate persistence natively, removing the need for JavaScript and keeping the implementation clean. ',
								'- The <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning">Anchor positioning Api</a> was also essential to this project, as it reduced the need for manual precise positioning typically required for tethered components.',
							]
						},
						{
							text: ['Afterwards these features and styling was used as the fundation for a game based on our classmates that resembles a Pokemon card game. ']
						},
						{
							images: [
								'/works-assets/windows/Screenshot 2024-02-11 174708.avif',
								'/works-assets/windows/Screenshot 2024-03-01 001326.avif',
								'/works-assets/windows/Screenshot 2024-02-11 174723.avif',
								'/works-assets/windows/Screenshot 2024-03-01 125947.avif'
							]
						},
						{
							text:["The result of this project was a playful and responsive UI that mimicked some of the interactions of Windows XP, an opportunity to implement new web features at that time, while showcasing the skills of my teammates and me"]
						}
					],
					collaborators: {
						owner: 'Christopher Willems',
						designer: 'Christopher Willems',
						collaborator: 'Anna-kyra'
					},
					tags: ['Svelte', 'NodeJS', 'Responsive ui', 'UI/UX', 'popover'],
					link: { src: 'https://brilletjes-squad-page.vercel.app/', showType: 'desktop' },
					dateStart: '2023',
					dateEnd: '',
					status: { is: 'experiment', sticker: '' }
				},
				// MERLIN
				{
					title: 'Merlin studios',
					slug: 'Potion game',
					published: { is: true, date: '' },
					description: 'A server based game',
					assets: {
						image: ['works-assets/8a92efbb8245058d9558606619b4ba46.avif'],
						icon: '/works-assets/merlin/m-black2.avif',
						// color: 'orange'
						color:'#ffab2e'
					},
					contentBlock: [
						{
							// text: [
							// 	`During a school sprint, i got a project to create a game using web fundamentals for Merlin Studio. They sought out creative coding to test out alternative ways for user interfaces, and it took the opportunity to build an interactive game that runs server-side.`
							// ],
							text: [
								`During a school sprint, I was given a brief by Merlin Studio to build a potion brewing game using web fundamentals.`,
								"The project was framed as a chance for developers to demonstrate creative coding and accessible UI thinking.",
							]
						},
						{
							images: ['/works-assets/merlin/chrome_fXsSOsVsKm.gif']
						},
						{
							// html:[` <p>They provided some assets for the ingridiends and potions, and a flat design as a starter,and had as criteria </p> <blockquote> creativity, accessibility, animations, design, and effects to showcase your digital magic</blockquote>. <p>but the UI and game logic was open for creative interpitation</p>
							
							// 		<p>With these in mind i thought to create a simple game where the player had a caldron and a book of potion, where They had to memorize the code of each potion and had only one chance per potion to seek and select the ingridients out by image around the cauldron</p> 
							// 		<p>the cauldron would be a dynamic grid that had areas of random ingridients that unlock per level</p>
									
							// 		 <p> but also to implement most of the logic within a server. 
							// 		 Also to use a dynamic grid layout system that I've been experimenting with.</p>
							// 		`
							// 		]
							html:[` 
									<p>They provided an API with assets for ingredients and potions, a flat design as a starting point, and a set of criteria: </p>
									<ul class="flat-list"><li>create coding</li> <li>accessibility</li> <li>animations</li> <li>design</li><li>effects to showcase "digital magic"</li></ul>.
									<p>The game logic and UI were left open to interpretation, and I didn't hold back.</p>
									`
									]
						},
						{
							html:[` 
									<p>The game runs on a Node server that tracks all brewing attempts, successful or failed, via REST. With the game state being stored in a Directus database.</p>
									<p>For the UI, I leaned into CSS <button data-open-file="1">...</button> concepts I'd been experimenting with: </p>
									<p> - A cauldron that sits at the center surrounded by ingredient areas arranged in a dynamic grid layout.</p>
									<p> - An animated potion book, where players have to learn and memorize the ingredient combination for each potion.</p>
									`
									]
						},
						{
							images: [
								'/works-assets/merlin/chrome_fXsSOsVsKm.gif',
								'/works-assets/merlin/Screenshot 2026-01-23 223247.avif',
								'/works-assets/merlin/m-black.webp',
							]
						},
						{
							images: [
								'/works-assets/merlin/chrome_fXsSOsVsKm.gif',
								'/works-assets/merlin/Screenshot 2026-01-23 223247.avif',
								'/works-assets/merlin/m-black.webp',
							
							]
						},
						{
							text:["The result of this project within that sprint was a simple but intentional web-based game with three levels. Each level has you collecting ingredients to brew a specific potion, with only one attempt per level to get it right and move on to the next.",
									"It was a good opportunity to combine interesting frontend concepts with a lightweight backend, and showcase to merlin my creative coding angle."
							],
						},
						{
							video: ['/works-assets/merlin/Recording 2024-06-21 014548.mp4']
						}
					],
					collaborators: {
						studio: 'Merlin studios',
						designer: 'Christopher Willems'
					},
					tags: [
						'Express',
						'NodeJS',
						'Directus',
						'Figma',
						'API',
						'EJS',
						'Server architecture',
						'Motion Design'
					],
					link: { src: 'https://proof-of-concept-for-merlin.vercel.app/', showType: 'desktop' },
					dateStart: '2024',
					dateEnd: '',
					status: { is: '', sticker: '' }
				},
				// ZUZA
				{
					title: 'zuza website',
					slug: 'Portfolio',
					published: { is: false, date: '' },
					description: 'a portfolio website for a designer named zuza',
					assets: { image: [''], icon: '', color: '' },
					contentBlock: [{}],
					collaborators: {
						owner: 'Zuza loch',
						designer: 'Zuza loch',
						developer: 'Christopher Willems'
					},
					tags: ['Svelte/Vue', 'NodeJS', 'Decap'],
					link: { src: '', showType: '' },
					dateStart: '2026',
					dateEnd: '',
					status: { is: '', sticker: '' }
				},
				// MONYTRI
				{
					title: 'Monytri',
					slug: 'PWA MVP',
					published: { is: true, date: '' },
					description: `An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. `,
					assets: {
						image: [
							'/works-assets/monytri/monytri 2233 2026-01-18 025839.avif',
							'/works-assets/monytri/Arc_jwNAJXUzVf.gif'
						],
						icon: '/pwa-64x64.avif',
						color: '#497951'
						// color:'#b2b857',
					},
					contentBlock: [
						{
							text: [
								`
								The Monytri app project is a cross-platform MVP built to communicate and illustarte a novel stock gifting interface. The goal was to translate the cleints vision of monytri into something tangible and testable idea for investors and stakeholders.								
								`
							]
						},
						{
							images: ['/works-assets/monytri/Figma_Mjt7uPPekq.avif']
						},

						{
							text: [
								`After some iterating with a designer, I proposed building it as a Progressive Web App, A cost-effective approach that would work seamlessly across mobile and desktop without maintaining separate codebases. 
								`,
								`From there, I stepped into the role of technical owner, shaping both the frontend experience and the underlying architecture.`
							]

							// images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
						},
						{
							text: [
								'On the frontend, I developed all interfaces and interactions from the ground up. Every screen was built with responsiveness in mind, ensuring the application feels native across devices. I focused on reusable components, clear hierarchy, and interaction patterns that communicate trust and clarity.'
							]
						},
						{
							images: [
								'/works-assets/monytri/Figma_CjbI66L49B.avif',
								'/works-assets/monytri/Figma_CX2Bw1aPrY.avif',
								// '/works-assets/monytri/Figma_GnlpxVwyMj.avif',
								// '/works-assets/monytri/Figma_KXONJf5GRc.avif',
								'/works-assets/monytri/Figma_Mjt7uPPekq.avif',
								'/works-assets/monytri/Figma_nImAExFQh3.avif',
								'/works-assets/monytri/Figma_qpFdozyYcm.avif',
								'/works-assets/monytri/Figma_SYUhIpEj2X.avif',
								'/works-assets/monytri/Screenshot 2026-03-09 2349322.avif',
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).avif',
								'/works-assets/monytri/Vector 6.avif',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.avif'
							]
						},
						{
							images: [
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).avif',
								'/works-assets/monytri/Vector 6.avif',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.avif'
							]
						},
						{
							text: [
								'On the backend, I designed a minimal but scalable infrastructure using Appwrite. This included RESTful endpoints, authentication flows, role management, and a CMS structure to support',
								`						
								Beyond core development, I implemented webhooks and service integrations to keep the system resilient. 
								Routine user testing and version testing ensured that each iteration aligned with the intended user stories and evolving market expectations.
								`
							]
						},
						
					],
					collaborators: {
						employer: 'David Dick, Chiara lung',
						designer: 'Amy Frost',
						developer: 'Christopher Willems'
					},
					tags: [
						'Svelte',
						'NodeJS',
						'ChartJS',
						'Ionic - Capacitor',
						'UI/UX',
						'Appwrite',
						'Figma',
						'Mobile first PWA'
					],
					link: { src: 'https://www.monytri.app', showType: '' },
					dateStart: '2024',
					dateEnd: '2026',
					status: { is: '', sticker: '' }
				},
				// REDPERS
				{
					title: 'Redpers',
					slug: 'UI overhaul',
					published: { is: true, date: '' },
					description: '',
					assets: {
						image: [''],
						icon: '/works-assets/redpers/Group 1.avif',
						// icon: '/works-assets/redpers/logo.svg',
						// color:'#e85340',
						color: '#971b1e'
					},
					contentBlock: [
						{
							text: [
								'Redpers is an online journalistic outlet that gives young and upcoming journalists a space to write and collaborate on stories happening across the Netherlands.',
								'During a school sprint my group and I got Repers as a client, and we had to introduce potential user interface enhancements for there main website. '
							]
							// video:['/works-assets/redpers/Recording 2024-05-24 105739.mp4']
						},
						{
							images: ['/works-assets/redpers/ezgif-2-71870b8477.gif']
						},
						{
							text: [
								'Within my group, my task was to propose and create potential enhancements for the article page In tandem with some user stories , test these with users, and to present how these can be integrated on to the website',
							],
							html: [
								`
								<h2>My propositions were :</h2>
								<ul>
									<li>A progress bar</li>
									<li>The ability to like or copy an article</li>
									<li>Alternative hero sections</li>
									<li>User preference theme state</li>
								</ul>`
							]
						},
						{
							// text:["The main consideration for these propositions was to find the right balance between accessibel and plesurable UI, keeping users oriented without losing their interest."]
							// text:["For me these propositions were the right balance between accessibel and plesurable UI, keeping users oriented without losing their interest."]
							text:["Due to prior user testing feedback and personal experience i concluded that these propositions were the right balance between accessibel and plesurable UI, with the intent of keeping the users oriented without losing their interest."]
						},
						{
							images: [
								'/works-assets/redpers/ezgif-2-71870b8477.gif',
								'/works-assets/redpers/Screenshot 2024-04-24 142200.avif',
								'/works-assets/redpers/Screenshot 2024-04-19 001126.avif',
								'/works-assets/redpers/Screenshot 2024-03-18 1543318.avif',
								'/works-assets/redpers/redpers css.gif',
								'/works-assets/redpers/Recording 2024-05-24 105739.mp4'
							]
							// video:['/works-assets/redpers/Recording 2024-05-24 105739.mp4']
						},
						{
							video: ['/works-assets/redpers/Recording 2024-05-24 105739.mp4']
						},
						{
							// text: ['After a round of testing and feedback with the client and users of the prototype, We refined and showcased each enhancement as its own component. ']
							text: ['The project concluded with a round of testing and feedback with the client and users, and then We refined and deliverd each enhancement as its own component. ']
						},
						{
							text: ["The public database that populated the custom version of the site and all its components has been discontinued.",
							"- You can visit the Redpers site to see some of the components or check out the GitHub repos to view the conclusions we reached for the project."
							],
							html: [
								`<a href="https://github.com/christoph3r3w/user-experience-enhanced-website/wiki/Iteration-1">
								Github link - iterations
								</a>
								<br>
								<a href="https://github.com/christoph3r3w/pleasurable-ui/wiki/Team%E2%80%90Ontwerp">
								Some designs 
								</a>`
							]
						},
						{
							html:[`
								<p>- I've recreated a simplified version of the API to populate an explorable version of the site, available here.</p> 
								<a href="/">Respers projec site</a>
							`]
						}
					],
					collaborators: {
						employer: 'Redpers',
						designer: 'Redpers',
						developer: 'Christopher Willems'
					},
					tags: [
						'Svelte',
						'NodeJS',
						'Express',
						'Directus',
						'Figma',
						'Mobile first PWA',
						'Contentfull',
						'UI/UX',
						'Progressive enhancement'
					],
					link: { src: 'https://redpers.nl', showType: '' },
					dateStart: '2024',
					dateEnd: '2024',
					status: { is: '', sticker: '' }
				},
				// PORTFOLIO WEBSITE
				{
					title: 'portfolio site',
					slug: 'portfolio site',
					published: { is: true, date: '' },
					description: '',
					assets: {
						image: [''],
						icon: '/portfolio icon/apple-touch-icon.avif',
						// color:'green',
						color: '#b2b857'
					},
					contentBlock: [{}],
					collaborators: {
						owner: 'Christopher'
					},
					tags: ['Experiment', 'Grid Motion', 'responsive design', 'UI/UX'],
					link: { src: 'https://www.google.com', showType: 'mobile' },
					dateStart: '2026',
					dateEnd: '2026',
					status: { is: 'experiment', sticker: '' }
				}
			]
		}
	];

	const workStatus = (works: any[]) => {
		return works.map((work) => {
			let updatedWork = { ...work };

			if (updatedWork.status.is && updatedWork.status.is != '') {
				return updatedWork;
			} else if (work.dateStart && work.dateEnd) {
				updatedWork.status.is = 'completed';
				updatedWork.status.sticker = '✅';
			} else if (work.dateStart && !work.dateEnd) {
				const startYear = parseInt(work.dateStart);
				const currentYear = new Date().getFullYear();
				if (currentYear > startYear) {
					updatedWork.status.is = 'in progress';
					updatedWork.status.sticker = '🚧';
				} else {
					updatedWork.status.is = 'planned';
				}
			} else {
				updatedWork.status.is = 'experiment';
				updatedWork.status.sticker = '🧪';
			}
			return updatedWork;
		});
	};

	let works = dataWorks[1].works;
	works = workStatus(works);
	let delaySimulation = 9000;
	delaySimulation = 0;
	// delaySimulation = 5000

	// Timeout and Retry System
	const TIMEOUT_MS = 10000; // 10 seconds
	const RETRY_DELAY_MS = 3000; // 3 seconds before retrying

	const fetchDataWithTimeout = () => {
		return Promise.race([
			new Promise((resolve) => {
				setTimeout(() => {
					resolve(dataWorks);
				}, delaySimulation);
			}),
			new Promise((_, reject) => {
				setTimeout(() => {
					reject(new Error('Request timeout: Data took longer than 10 seconds to load'));
				}, TIMEOUT_MS);
			})
		]);
	};

	const fetchWithRetry = async (maxRetries = Number.POSITIVE_INFINITY) => {
		let lastError;

		while (maxRetries > 0) {
			try {
				const result = await fetchDataWithTimeout();
				return result;
			} catch (error) {
				lastError = error;
				maxRetries--;

				if (maxRetries > 0) {
					// Wait 3 seconds before retrying
					await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
				}
			}
		}
		throw lastError;
	};

	const projects = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(dataWorks);
			reject();
		}, delaySimulation);
		fetchWithRetry();

	}); 


	return {
		// dataWorks,
		projects,
		delay: delaySimulation == 0 ? RETRY_DELAY_MS : delaySimulation
	};
}
