<script>
     import Signup from "./Signup.svelte";
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
        function callback2(data){
          localStorage.setItem('token',data.token)
      }
      function callback1(res){
        res.json().then(callback2)
      }
      fetch('http://localhost:3000/dealer/signup',{
        method: 'POST',
        body: JSON.stringify({
            username:email,
            password:password
        }),
        headers: {
            'Content-type':'application/json'
        }
      }).then(callback1)
    }
    onMount (async() =>{
        takeinput();
    })
</script>

<div  >
    <div class=" text-center text-1xl mt-32 text-ml font-sans font-semibold " >
    Welcome Dealers SignUp below
   </div>
   <div class="display : flex  justify-center mt-18">
   <div class="bg-white rounded overflow-hidden shadow-md w-80">
    <input type="text"  placeholder="Email"
     class="px-3 py-2 font-semibold placeholder-gray-500  text-black "
     value={email} on:input={handleEmailInput}>

     <input type="password"  placeholder="password" 
     class="px-3 py-2 font-semibold placeholder-gray-500  text-black "
     value={password} on:input={handlePasswordInput}>
     <br>
      <button class="px-5 py-2 rounded-md bg-blue-500 g ml-3" 
      on:click={takeinput}
      >SignUp</button>
   </div>
    
   </div>

</div>


