import { text } from "node:stream/consumers";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
   
	interface Work {
		title: string;
		slug: string;
		published: { is: boolean; date: string };
		description: string;
		assets: { image: string[]; icon?: string; color?: string };
		link: {src:string,showType:'' | 'mobile' | 'desktop'};
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{ text?: string[]; images?: string[]; h2?: string }>;
		collaborators?: Record<string, string>;
		tags?: string[];
	}

	let dataWorks : any[]  =  [
		{pagination: 'none'},
		{works:[
			{
				title: 'tile shifting',
				slug: 'Grid experiment',
				published:{is:false,date:''},
				description: 'An experimentation I did to test out grid animation that in the future was used as an animatable grid layout. The idea was to have a grid of tiles that shift their position when hovered, creating a dynamic and interactive visual effect. The shifting is achieved through CSS transitions, allowing the tiles to smoothly move to new positions within the grid when the user interacts with them.',
				assets:{image: [''], icon: '',color:'pink'},
				contentBlock:[{}],
				collaborators: {
					owner:'Christopher',
				},
				tags:['Experiment','Grid Motion','responsive design'],

				link: {src:'https://www.google.com',showType:''},
				dateStart: '2023',
				dateEnd: '2023',
				status: {is:'experiment',sticker:''}
			},
			{
				title: 'windows',
				slug: 'School project',
				published:{is:true,date:''},
				// description: 'I got to create a profile card that showcased my understanding of the web fundamentals in the form of a profilecard. I took this opportunity to experiemnt with toen die tijd the new popover api and styled it in the look and feel of the Windows XP interface.',
				assets:{
					image: [
						'25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg',
						'chris icon lowlowres.png',
						'works-assets/chris landing page portfolio ideas-02.jpg'
					],
					icon: '/works-assets/windows/pngwing.com.png',
					color:'skyblue',
					// color:'#c0c0d7',
				},
				contentBlock:[
					{
						h2:['intro'],
						text:[ 'I got to create a profile card that showcased my understanding of the web fundamentals in the form of a profilecard. I took this opportunity to experiemnt with toen die tijd the new <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">popover api</a> and styled it in the look and feel of the Windows XP interface.'],
					},
					{
						images:['./works-assets/windows/chrome_KDKznicEhK.gif']
					},
					{
						images:[
								'/works-assets/windows/Recording 2026-03-02 022626.gif',
								'/works-assets/windows/chrome_hh5Wv4h7nO.gif',
								'/works-assets/windows/pngwing.com.png',
								]
					},
					{
						text:['The popover API seemed to be really reliable for such a project. The ability to toggle components without having to use JavaScript, and also the ability to drag and save the coordinates of the window without having to use JavaScript, made styling and the layout more approachable and accessible. ',
						'Me and some other schoolmates decided to to use concept as the fundation for a game based on our classmates That resembled a Pokemon card game. '
						
						]
					},
					{
						images:[
								'/works-assets/windows/Screenshot 2024-02-11 174708.png',
								'/works-assets/windows/Screenshot 2024-03-01 001326.png',
								'/works-assets/windows/Screenshot 2024-02-11 174723.png',
								'/works-assets/windows/Screenshot 2024-03-01 125947.png',

								]
					}

				],
				collaborators: {
					owner:'Christopher Willems',
					designer:'Christopher Willems',
					collaborator:'Anna-kyra'
				},
				tags:['Svelte','NodeJS','Responsive ui','UI/UX','popover'],
				link: {src:'https://brilletjes-squad-page.vercel.app/',showType:''},
				dateStart: '2023',
				dateEnd: '',
				status:{is:'experiment',sticker:''}
			},	
			{
				title: 'monytri-3',
				slug: 'PWA MVP',
				published:{is:false,date:''},

				description: `An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. It is a progressive web app that centralizes stock gifting, asset transfers, and payment requests, while also allowing users to practice and learn about financial literacy.
									The platform encourages users to stay up to date with their personal portfolios, learn from curated educational content on portfolio management, and exchange assets through built-in services.`,
				assets:{
					image: [
						'/works-assets/monytri/monytri 2233 2026-01-18 025839.png',
						'/works-assets/monytri/Arc_jwNAJXUzVf.gif'
					],
					icon: '/pwa-64x64.png',
					color:'#497951'
				},
				contentBlock:[
					{
						text: ['test content block 1'],
					},
					{
						text: ['test content block 2',
								'lorem400 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						],
						images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['lorem2000 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
						
					},
					{
						// text: ['test content block 4'],
						images:[
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
					{
						text: ['test content block 5',
								'another line in block'
						],
						images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['test content block 6'],
					},
					{
						images:[
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
				],
				collaborators: {
					employer:'David Dick, Chiara lung',
					designer:'Amy Frost',
					collaboratorA:'collaboratorA',
					collaboratorB:'collaboratorB',
				},
				link: {src:'https://www.monytri.app/',showType:''},
				dateStart: '2024',
				dateEnd: '2026',
				status:{is:'',sticker:''}
			},
			{
				title: 'potion game',
				slug: 'Project for Merlin studios',
				published:{is:true,date:''},
				description: "A server based game",
				assets:{
					image: [
						'works-assets/8a92efbb8245058d9558606619b4ba46.jpg'
					],
					icon: '/works-assets/merlin/m-black2.png',
					color:'orange',
					// color:'#f7eab5'
				},
				contentBlock:[
					{
						text:[`During a final school sprint, we've gotten a project to create a game using web fundamentals for Merlin Studio you.They wanted to test out alternative ways for user interfaces, and it took the opportunity to build an interactive game that runs fully on the server.`]
					},
					{
						images:['/works-assets/merlin/chrome_fXsSOsVsKm.gif']
					},
					{
						video:['/works-assets/merlin/Recording 2024-06-21 014548.mp4']
					}
				],
				collaborators: {
					studio:'Merlin studios',
					designer:'Christopher Willems',
				},				
				tags:['Express','NodeJS','Directus','Figma','API','EJS','Server architecture','Motion Design'],
				link: {src:'https://proof-of-concept-for-merlin.vercel.app/',showType:'desktop'},
				dateStart: '2024',
				dateEnd: '',
				status:{is:'',sticker:''}
			},
			{
				title: 'zuza website',
				slug: 'Portfolio',
				published:{is:false,date:''},
				description: 'a portfolio website for a designer named zuza',
				assets:{image: [''], icon: '',color:''},
				contentBlock:[{}],
				collaborators: {
					owner:'Zuza loch',
					designer:'Zuza loch',
					developer:'Christopher Willems',
				},
				tags:['Svelte/Vue','NodeJS','Decap'],
				link: {src:'',showType:''},
				dateStart: '2026',
				dateEnd: '',
				status:{is:'',sticker:''}
			},
			{
				title: 'Monytri',
				slug: 'PWA MVP',
				published:{is:true,date:''},
				// description: `An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. `,
				assets:{
						image: [
								'/works-assets/monytri/monytri 2233 2026-01-18 025839.png',
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif'
								],
						icon: '/pwa-64x64.png', 	
						color:'#497951',	
						// color:'#b2b857',	
				},
				contentBlock:[
					{
						h2:'intro',
						text: [`
								The Monytri app is a cross-platform MVP built to communicate and illustarte a stock gifting concept clearly to investors and stakeholders. The goal was to translate <a>their</a> idea into something tangible and testable.								
								`],
										
					},
					{
						images:[
								'/works-assets/monytri/Figma_Mjt7uPPekq.png',
								]
					},
					
					{
						text: [
								`After some iterating with a designer, I proposed building it as a Progressive Web App, A cost-effective approach that would work seamlessly across mobile and desktop without maintaining separate codebases. 
								`,
								`From there, I stepped into the role of technical owner, shaping both the frontend experience and the underlying architecture.`
								],
				
						// images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['On the frontend, I developed all interfaces and interactions from the ground up. Every screen was built with responsiveness in mind, ensuring the application feels native across devices. I focused on reusable components, clear hierarchy, and interaction patterns that communicate trust and clarity.'
									,
						],
					},
					{
						images:[
								'/works-assets/monytri/Figma_CjbI66L49B.png',
								'/works-assets/monytri/Figma_CX2Bw1aPrY.png',
								// '/works-assets/monytri/Figma_GnlpxVwyMj.png',
								// '/works-assets/monytri/Figma_KXONJf5GRc.png',
								'/works-assets/monytri/Figma_Mjt7uPPekq.png',
								'/works-assets/monytri/Figma_nImAExFQh3.png',
								'/works-assets/monytri/Figma_qpFdozyYcm.png',
								'/works-assets/monytri/Figma_SYUhIpEj2X.png',
								'/works-assets/monytri/Screenshot 2026-03-09 2349322.png',
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
					{
						images:[
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
					{
						text: [
						'On the backend, I designed a minimal but scalable infrastructure using Appwrite. This included RESTful endpoints, authentication flows, role management, and a CMS structure to support'
						,
						`						
						Beyond core development, I implemented webhooks and service integrations to keep the system resilient. Routine user testing and version testing ensured that each iteration aligned with the intended user stories and evolving market expectations.
						`
						],
					},
					// {
					// 	text: [
					// 	`<h2>bo mama</h2>`,
					// 	`<ul>
					// 	<li>
					// 	1233
					// 	</li>
					// 	<li>
					// 	3456
					// 	</li>
					// 	<li>
					// 	6789
					// 	</li>
					// 	</ul> `
					// 	],
					// },
				],
				collaborators: {
					employer:'David Dick, Chiara lung',
					designer:'Amy Frost',
					developer:'Christopher Willems',
				},
				tags:['Svelte','NodeJS','ChartJS','Ionic - Capacitor','UI/UX','Appwrite','Figma','Mobile first PWA'],
				link: {src:'https://www.monytri.app',showType:''},
				dateStart: '2024',
				dateEnd: '2026',
				status:{is:'',sticker:''}
			},
			{
				title: 'Redpers',
				slug: 'UI overhaul',
				published:{is:true,date:''},
				description: 'School project',
				assets:{
					image: [''], 
					icon: '/works-assets/redpers/Group 1.png',
					// icon: '/works-assets/redpers/logo.svg',
					// color:'#e85340',
					color:'#971b1e',
						},
				contentBlock:[
					{
						text:[
						'Red Bears is an online journalistic platform that provides a platform for young and upcoming journalists to write and to collaborate on stories happening within Holland. ',
						'For one of our sprints during the study, we got the opertunity to do a redesign of the user interface for redpers. The task was to think of alternative ways of how the user interface can be and to find creative solutions to enrich how red bars present themselves. '
						],
						// video:['/works-assets/redpers/Recording 2024-05-24 105739.mp4']
					},
					{
						images:['/works-assets/redpers/ezgif-2-71870b8477.gif'],
					},
					{
						images:[
						'/works-assets/redpers/ezgif-2-71870b8477.gif',
						'/works-assets/redpers/Screenshot 2024-04-24 142200.png',
						'/works-assets/redpers/Screenshot 2024-04-19 001126.png',
						'/works-assets/redpers/Screenshot 2024-03-18 1543318.png',
						'/works-assets/redpers/redpers css.gif',
						],
					},
					{
						html:[
						`<a href="https://github.com/christoph3r3w/user-experience-enhanced-website/wiki/Iteration-1">
						https://github.com/christoph3r3w/user-experience-enhanced-website/wiki/Iteration-1
						</a>
						<br>
						<a href="https://github.com/christoph3r3w/pleasurable-ui/wiki/Team%E2%80%90Ontwerp">
						https://github.com/christoph3r3w/pleasurable-ui/wiki/Team%E2%80%90Ontwerp
						</a>`,
					
						]
					},{
						video:['/works-assets/redpers/Recording 2024-05-24 105739.mp4']
					}
				
				],
				collaborators: {
					employer:'Redpers',
					designer:'Redpers',
					developer:'Christopher Willems',
				},
				tags:['Svelte','NodeJS','Express','Directus','Figma','Mobile first PWA','Contentfull','UI/UX','Progressive enhancement'],
				link: {src:'https://redpers.nl',showType:''},
				dateStart: '2024',
				dateEnd: '2024',
				status: {is:'',sticker:''}
			},
			{
				title: 'portfolio site',
				slug: 'portfolio site',
				published:{is:true,date:''},
				description: '',
				assets:{
					image: [''], 
					icon: '/portfolio icon/apple-touch-icon.png',
					// color:'green',
					color:'#b2b857',	

				},
				contentBlock:[{}],
				collaborators: {
					owner:'Christopher',
				},
				tags:['Experiment','Grid Motion','responsive design','UI/UX'],
				link: {src:'https://www.google.com',showType:''},
				dateStart: '2026',
				dateEnd: '2026',
				status: {is:'experiment',sticker:''}
			},
		]}
	]

	const workStatus = (works : any[])=>{
			return works.map((work)=>{
				let updatedWork = {...work};

				if(updatedWork.status.is && updatedWork.status.is != ''){
					return updatedWork;
				}else if(work.dateStart && work.dateEnd){
					updatedWork.status.is = 'completed'; 
					updatedWork.status.sticker = '✅'; 
				}else if(work.dateStart && !work.dateEnd){
					const startYear = parseInt(work.dateStart);
					const currentYear = new Date().getFullYear();
					if(currentYear > startYear){
						updatedWork.status.is = 'in progress';
						updatedWork.status.sticker = '🚧'; 
					}else{
						updatedWork.status.is = 'planned';
					}
				}else{
					updatedWork.status.is = 'experiment';
					updatedWork.status.sticker = '🧪'; 
				}
				return updatedWork;
			});
	};
	
	let works = dataWorks[1].works
	works = workStatus(works);
	let delaySimulation = 9000
	delaySimulation = 0
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
					await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
				}
			}
		}
		
		throw lastError;
	};

	

	const projects = new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(dataWorks)
			reject()
		},delaySimulation)
			// fetchWithRetry();
	})
	
	return {
		dataWorks,
		projects,
		delay: delaySimulation == 0? RETRY_DELAY_MS:delaySimulation
	};
};