<script>
  import {onMount} from 'svelte'
  let email = '';
  let  password   = ''

  function handleEmailInput(e) {
    email = e.target.value;
  }

  function handlePasswordInput(e) {
    password = e.target.value
  }


    function takeinput(){
      fetch('http://localhost:3000/admin/login',{
        method: 'POST',
        body: JSON.stringify({
            username:email,
            password:password
        }),
        headers: {
            'Content-type':'application/json'
        }
      })
    }
    onMount (async() =>{
        takeinput();
    })
</script>
<div >
    <div class=" text-center text-1xl mt-32 text-ml font-sans font-semibold " >
    Welcome Cars24 SignIn below
   </div>
   <div class="display : flex  justify-center mt-18">
   <div class="bg-white rounded overflow-hidden shadow-md w-80">
    <input type="text" name="Email" placeholder="Email"
    autocomplete="off" 
    aria-label="Email " class="px-3 py-2 font-semibold placeholder-gray-500
     text-black " value={email} on:input={handleEmailInput}>
     <input type="password" name="password" placeholder="password"
    autocomplete="off" 
    aria-label="password" class="px-3 py-2 font-semibold placeholder-gray-500
     text-black " value={password} on:input={handlePasswordInput}>
     <br>
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" 
    on:click={takeinput} >Signin
      </button>
      

      <br>
      <div class="mt-3 px-9 mb-3">Don't have an account? Sign Up </div>
   </div>
    
   </div>

</div>


