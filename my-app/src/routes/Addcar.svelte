<script>

    import {onMount} from 'svelte'
    let title = '';
    let  description  = ''
    let image = ""
  
    function handleTitleInput(e) {
      title = e.target.value;
    }
  
    function handleDescInput(e) {
      description = e.target.value
    }

    function handleImageInput(e) {
      image = e.target.value
    }
  
  
    const takeinput = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/cars', {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            description : description,
            image :'',
          }),
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
  
        const data = await response.json();
        alert('cars Added Successfully')
      } catch (error) {
        console.error('Error:', error);
      }
    };
      onMount (async() =>{
         
      })
  </script>
  <div class="Addcar" >
      <div class=" text-center text-1xl mt-32 text-ml font-sans font-semibold " >
      Create Cars 
     </div>
     <div class="display : flex  justify-center mt-18">
     <div class="bg-white rounded overflow-hidden shadow-md w-80">
      <input type="text" placeholder="Title"
      aria-label="Email " class="px-3 py-2 font-semibold placeholder-gray-500
       text-black " value={title} on:input={handleTitleInput}>
       <input type="text" placeholder="Description" 
        class="px-3 py-2 font-semibold placeholder-gray-500
       text-black " value={description} on:input={handleDescInput}>
       <br>
       <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" 
      on:click={takeinput}>Add COURSE</button>
       
     </div>
      
     </div>
  
  </div>
  
  
  