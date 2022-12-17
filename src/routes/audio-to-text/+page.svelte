<script>
  let inputValue = '';

function handleSubmit() {
  // do something with the input value
  console.log(inputValue);
}
  </script>
  
  <form>
    <label for="inputField">Enter some text:</label><br>
    <input type="text" id="inputField" bind:value={inputValue}>
    <input type="submit" value="Submit" on:click={handleSubmit}>
  </form>
  