

export default function Error() {

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    return (

        <div>
            <div id='1' draggable={true}
            style={{margin: "20px"}}
                onDragOver={(e) => dragOverHandler(e)}
            >one element
            </div>
            <div id='2' draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
            >another element
            </div>
        </div>

    )
}