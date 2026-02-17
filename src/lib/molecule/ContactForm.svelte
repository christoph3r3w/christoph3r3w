<script lang="ts">
	import {fade} from 'svelte/transition';
	let {works} = $props();
</script>


	<details 
		transition:fade
		class="file file-{works.length} file-contact"
		style="--file-index:calc(var(--total-work) ); --work-icon: url('/works-assets/material-assets/Chris website14.png'); --file-primary-color:green;">
		<summary tabindex="-1" class="experiment">
			<span class="file-title">
				your project here ???
			</span>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			<div class="close-file-icon">
				<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z" />
				</svg>
			</div>
		</summary>
		<article class="work-description">
			<h2>Lets get in contact </h2>
			<!-- <div class="description-space"></div>  -->
			<div class="description-info">
				<form action="/contactForm" method="post">
					<fieldset>
						<input type="text" name="name" placeholder="full Name" required>
						<input type="email" name="email" placeholder="Your Email" required>
					</fieldset>
					<fieldset>
						<textarea name="message" placeholder="Your Message" required></textarea>
					</fieldset>
						<button type="submit">Send</button>
				</form>
			</div>
			<div class="mail-preview">
				<h2>x</h2>
			</div>
		</article>
	</details>

