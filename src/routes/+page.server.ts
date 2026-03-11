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
				assets:{image: [''], icon: '',color:''},
				contentBlock:[{}],
				collaborators: {
					owner:'Christopher',
				},
				tags:['Experiment','Grid Motion','responsive design'],

				link: {src:'https://www.google.com',showType:''},
				dateStart: '2023',
				dateEnd: '2023',
				status: {is:'an experiment',sticker:''}
			},
			{
				title: 'windows',
				slug: 'School project',
				published:{is:true,date:''},
				description: 'For one of these prints for school, I had to create a profile card that showcases my current understanding of the web fundamentals while highlighting where I am at in my studies and ways that I can be found. I took this opportunity to be creative and redesigned this card to resemble the Windows XP. The card features a profile picture, a brief description, and links to my social media profiles, all styled to evoke the nostalgic look and feel of the Windows XP interface.',
				assets:{
					image: [
						'25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg',
						'chris icon lowlowres.png',
						'works-assets/chris landing page portfolio ideas-02.jpg'
					],
					icon: '/works-assets/windows/Windows_XP_Logo2.png',
					color:'skyblue',
					// color:'#c0c0d7',
				},
				contentBlock:[
					{
						text: ['For one of these prints for school, I had to create a profile card that showcases my current understanding of the web fundamentals while highlighting where I am at in my studies and ways that I can be found. I took this opportunity to be creative and redesigned this card to resemble the Windows XP. The card features a profile picture, a brief description, and links to my social media profiles, all styled to evoke the nostalgic look and feel of the Windows XP interface. '	]	
					},
					{
						images:['./works-assets/windows/chrome_KDKznicEhK.gif']
					},
					{
						images:[
								'/works-assets/windows/chrome_hh5Wv4h7nO.gif',
								'/works-assets/windows/Recording 2026-03-02 022626.gif'
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
				dateStart: '',
				dateEnd: '',
				status:{is:'',sticker:''}
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
					// color:'orange',
					color:'#f7eab5'
				},
				contentBlock:[
				{
					text:[`During a final school sprint, we've gotten a project to create a game using web fundamentals for Merlin Studio you.They wanted to test out alternative ways for user interfaces, and it took the opportunity to build an interactive game that runs fully on the server.`]
				},
				{
					images:['/works-assets/merlin/chrome_fXsSOsVsKm.gif']
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
				title: 'monytri',
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
														Monytri is a cross-platform MVP built to communicate a financial concept clearly — not just to users, but to investors and stakeholders. The goal wasn't to ship a full-scale product, but to translate an idea into something tangible, testable, and convincing.								
														`],
												
											},
											{
												images:[
														'/works-assets/monytri/Figma_Mjt7uPPekq.png',
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
												text: [`
												After iterating closely with a designer, I proposed building it as a Progressive Web App — a cost-effective approach that would work seamlessly across mobile and desktop without maintaining separate codebases. From there, I stepped into the role of technical owner, shaping both the frontend experience and the underlying architecture.
												`],
											
						// images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['On the frontend, I developed all interfaces and interactions from the ground up. Every screen was built with responsiveness in mind, ensuring the application feels native across devices. Rather than static layouts, I focused on reusable components, clear hierarchy, and interaction patterns that communicate trust and clarity.',
								'On the backend, I designed a minimal but scalable infrastructure using Appwrite. This included RESTful endpoints, authentication flows, role management, and a CMS structure to support'
						],
					},
					{
						images:[
								// '/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
					{
						text: [`
						Beyond core development, I implemented webhooks and service integrations to keep the system resilient. Routine user testing and version testing ensured that each iteration aligned with the intended user stories and evolving market expectations.
						`],
						// images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: [`
						Equally important was communication. I maintained documentation that translated technical decisions into language stakeholders could understand — keeping everyone aligned on architecture, scalability, and future potential.
						`],
						// images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
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
				title: 'redpers',
				slug: 'UI overhaul',
				published:{is:true,date:''},
				description: 'School project',
				assets:{
					image: [''], 
					icon: '/works-assets/redpers/Group 1.png',
					// color:'#e85340',
					color:'#971b1e',
						},
				contentBlock:[
					{
					text:[
					'Red Bears is an online journalistic platform that provides a platform for young and upcoming journalists to write and to collaborate on stories happening within Holland. ',
					'For one of our sprints during the study, we got the opertunity to do a redesign of the user interface for redpers. The task was to think of alternative ways of how the user interface can be and to find creative solutions to enrich how red bars present themselves. '
					]
					},
				
				],
				collaborators: {
					employer:'Redpers',
					designer:'Redpers',
					developer:'Christopher Willems',
				},
				tags:['Svelte','NodeJS','Express','Directus','Figma','Mobile first PWA','Contentfull','UI/UX','Progressive enhancement'],
				link: {src:'https://www.google.com',showType:''},
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
					icon: '',
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
				status: {is:'an experiment',sticker:''}
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
					updatedWork.status.is = 'an experiment';
					updatedWork.status.sticker = '🧪'; 
				}
				return updatedWork;
			});
	};
	
	let works = dataWorks[1].works
	works = workStatus(works);
	let delaySimulation = 9000
	delaySimulation = 0

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