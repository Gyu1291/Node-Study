async function Workers() {
  var workerCount = 0
  function startNew() {
    return new Promise((res) => {
      setTimeout(() => res(++workerCount), 1000)
    })
  }
  return startNew()
}

async function doAsync() {
  console.log(await Workers())
  console.log(await Workers())
  console.log(await Workers())
  console.log(await Workers())
}

doAsync()
