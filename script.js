async function loadSubgenres() {
    const response = await fetch("./subgenres.json")
    const subgenres = await response.json()
    const guide = document.getElementById("guide")
    let column = document.createElement("div")
    column.className = "column"
    let count = 0
    function createAlbums(albumsData, titles, insertSeparator) {
        let albums = document.createElement("div")
        albums.className = "albums"
        let titleCount = 0
        for (const [albumName, albumLink] of Object.entries(albumsData)) {
            let album = document.createElement("a")
            album.className = "album"
            album.title = albumName
            album.href = albumLink
            album.target = "_blank"
            album.style.backgroundImage = `url("./assets/covers/${albumName}.jpg")`
            albums.appendChild(album)
            let t = document.createElement("div")
            t.className = "titlesTitle"
            t.textContent = albumName
            titles.appendChild(t)
            titleCount++
            if (titleCount % 7 === 0) {
                let spacer = document.createElement("div")
                spacer.className = "titlesTitle"
                spacer.textContent = ""
                titles.appendChild(spacer)
            }
        }
        if (insertSeparator) {
            let sep = document.createElement("div")
            sep.className = "titlesTitle"
            sep.textContent = ""
            titles.appendChild(sep)
        }
        return albums
    }
    for (const [subgenreName, subgenreData] of Object.entries(subgenres)) {
        if (count === 6) {
            guide.appendChild(column)
            column = document.createElement("div")
            column.className = "column"
            count = 0
        }
        let subgenre = document.createElement("div")
        subgenre.className = "subgenre"
        let info = document.createElement("div")
        info.className = "info"
        let title = document.createElement("div")
        title.className = "title"
        title.textContent = subgenreName
        let description = document.createElement("div")
        description.className = "description"
        description.textContent = subgenreData[0]
        info.appendChild(title)
        info.appendChild(description)
        let content = document.createElement("div")
        content.className = "content"
        let titles = document.createElement("div")
        titles.className = "titles"
        content.appendChild(createAlbums(subgenreData[1], titles, true))
        for (let i = 2; i < subgenreData.length; i += 2) {
            let subtitle = document.createElement("div")
            subtitle.className = "subtitle"
            subtitle.textContent = subgenreData[i]
            content.appendChild(subtitle)
            content.appendChild(createAlbums(subgenreData[i + 1], titles, false))
        }
        subgenre.appendChild(info)
        subgenre.appendChild(content)
        subgenre.appendChild(titles)
        column.appendChild(subgenre)
        count++
    }
    if (column.children.length > 0) guide.appendChild(column)
}
loadSubgenres()