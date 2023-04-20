export default function getOwnerAndRepoFromUrl(repoUrl) {
    const arr = repoUrl.split("/")
    const [repoOwner, repoName] = [arr[3]?.toLocaleLowerCase(), arr[4]?.toLocaleLowerCase()]
    return { repoOwner, repoName }
}
