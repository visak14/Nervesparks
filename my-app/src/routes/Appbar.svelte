<script>
  import { onMount } from 'svelte';
  const navigateToAbout = () => {
    window.location.href = '/dealer';
  };
</script>

<div  class="A">
<h6 class="prose text-white text-2xl rounded-md px-2 py-1 bg-blue-500" >Cars24</h6>
<div class="display: flex space-x-2" >
<div> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
  on:click={navigateToAbout}>
    Dealer
  </button>
  </div>
<div> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

   User
  </button>

  </div>

</div>  
</div>



<style>
     .A{

        display: flex;
        justify-content: space-between;
        padding: 3;
        z-index: 1;
     }

    
</style>
