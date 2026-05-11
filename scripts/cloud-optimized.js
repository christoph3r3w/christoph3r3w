import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name:'dkemfwmvh'
})

let stickers =[
	'korsou_sticker_couv62',
	'svelte_kzwxx3',
	'in_progress-texture_ahgqwn',
	'in_progresss-texture-clear_croc0l',
	'vue_jbfvmb',
	'js_sticker_2_egl5je',
	'figma_sticker_jkhxt7',
	'c-name_free_oknivz',
	'c-icon-pixeled_pedsph'
]
let f = [
	'25acb22a-22a3-41d5-a0eb-c91529c4c6c8_Custom_rnbhzd',
	'2533cde4-1781-47d6-a605-089cc54dfa8e2_ecpjff'

]
let bg = [
	'Chris_website14_wmmx92',
	'paper_1_black_white_transparent_cropped_Custom_flipped_lutsvx',
	'paper_1_black_white_transparent_cropped_Custom_l3fsma'

]

function run(){
	for(const id of bg){
		const url = cloudinary.url(id,{
		transformation:[
			{
				quality:'auto',
				fetch_format:'auto'
			}
		]
		
		});
		console.log(url);
	}
}
run()