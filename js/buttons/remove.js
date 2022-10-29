export function remove(removeList) {
  for (let i = 0; i < removeList.length; i++) {
    const jgbj = removeList[i];
    jgbj.classList.remove("remove");
    console.log(jgbj);
  }
}
