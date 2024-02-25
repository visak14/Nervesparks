<script>
  import Router from "svelte-spa-router"
   import Signup from "./routes/Signup.svelte"
  import Appbar from "./routes/Appbar.svelte";
  import Signin from "./routes/Signin.svelte";
  import DealerSignin from "./routes/DealerSignin.svelte";
  import DealerSignup from "./routes/DealerSignup.svelte";
  import UserSignin from "./routes/UserSignin.svelte";
  import UserSignup from "./routes/UserSignup.svelte";

  let routes = {
  "/": Signin ,
  "/signup": Signup,
  "/dealer": DealerSignin,
  "/dealerOut": DealerSignup,
  "/user": UserSignin,
  "/UserOut":UserSignup
  

}
</script>

<main>
  <Appbar/>
  <Router {routes}/>

</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>

