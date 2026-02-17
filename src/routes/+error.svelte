<script>
    import { page } from '$app/stores';

    function handleClick() {
        location.reload();
    }
</script>

<section class="error-container">
    <article>
    <h2>{$page?.status}: {$page?.error?.message}</h2>
    <p>error occurred</p>
    <button onmouseup={handleClick}>refresh</button>
    </article>

</section>

<style>
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f8d7da;
    }

    .error-container article {
        text-align: center;
        background-color: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .error-container h2 {
        color: #721c24;
        margin-bottom: 1rem;
    }

    .error-container p {
        color: #721c24;
        font-size: 1.2rem;
    }

    .error-container button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: #721c24;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
    }
</style>