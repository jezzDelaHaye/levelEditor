let cells = []

const ROWS = 60
const COLS = 60

let CELLSIZE
let currentValue = 1

let cnv
let perimeterButton
let uiDiv

function setup()
{
    cnv = createCanvas(800, 800)

    CELLSIZE = width / COLS

    createGrid()

    perimeterButton = createButton("Fill Perimeter")
    perimeterButton.position(10, height + 70)
    perimeterButton.mousePressed(fillPerimeter)

    cnv.elt.oncontextmenu = () => false

    createUI()
}

function createUI()
{
    uiDiv = createDiv()
    uiDiv.position(10, 10)
    uiDiv.style("color", "white")
    uiDiv.style("font-family", "monospace")
    uiDiv.style("font-size", "14px")
    uiDiv.style("line-height", "18px")

    uiDiv.html(`
        <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">

            <div>0 <span style="display:inline-block;width:12px;height:12px;background:#000;border:1px solid #555"></span> empty</div>

            <div>1 <span style="display:inline-block;width:12px;height:12px;background:#ffffff"></span> wall</div>

            <div>2 <span style="display:inline-block;width:12px;height:12px;background:#00ff00"></span> health</div>

            <div>3 <span style="display:inline-block;width:12px;height:12px;background:#ff8c00"></span> enemy</div>

            <div>4 <span style="display:inline-block;width:12px;height:12px;background:#ff0000"></span> enemy</div>

            <div>5 <span style="display:inline-block;width:12px;height:12px;background:#00aaff"></span> spawn</div>

            <div>6 <span style="display:inline-block;width:12px;height:12px;background:#ffff00"></span> end</div>

        </div>
    `)
}

function createGrid()
{
    for (let row = 0; row < ROWS; row++)
    {
        cells[row] = []
        for (let col = 0; col < COLS; col++)
        {
            cells[row][col] = 0
        }
    }
}

function draw()
{
    background(0)
    drawCells()
}

function drawCells()
{
    stroke(30)

    for (let row = 0; row < ROWS; row++)
    {
        for (let col = 0; col < COLS; col++)
        {
            let val = cells[row][col]

            let x = col * CELLSIZE
            let y = row * CELLSIZE

            if (val === 1) fill(255)
            else if (val === 2) fill(0, 255, 0)
            else if (val === 3) fill(255, 140, 0)
            else if (val === 4) fill(255, 0, 0)
            else if (val === 5) fill(0, 150, 255)
            else if (val === 6) fill(255, 255, 0)
                
            else fill(0)

            rect(x, y, CELLSIZE, CELLSIZE)
        }
    }

    noStroke()
}

function mousePressed(event)
{
    paint(event)
}

function mouseDragged(event)
{
    paint(event)
}

function paint(event)
{
    let col = Math.floor(mouseX / CELLSIZE)
    let row = Math.floor(mouseY / CELLSIZE)

    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return

    if (event.button === 2)
    {
        cells[row][col] = 0
    }
    else
    {
        cells[row][col] = currentValue
    }
}

function fillPerimeter()
{
    for (let col = 0; col < COLS; col++)
    {
        cells[0][col] = 1
        cells[ROWS - 1][col] = 1
    }

    for (let row = 0; row < ROWS; row++)
    {
        cells[row][0] = 1
        cells[row][COLS - 1] = 1
    }
}

function keyPressed()
{
    if (key >= '0' && key <= '6')
    {
        currentValue = Number(key)
    }

    if (keyCode === 32)
    {
        exportLevel()
    }
}

function exportLevel()
{
    let mapString = "const MAP = [\n"

    for (let row = 0; row < ROWS; row++)
    {
        let line = "\""

        for (let col = 0; col < COLS; col++)
        {
            let val = cells[row][col]

            if (val === 0) line += " "
            if (val === 1) line += "#"
            if (val === 2) line += "."
            if (val === 3) line += "+"
            if (val === 4) line += "@"
            if (val === 5) line += "^"
            if (val === 6) line += "$"
        }

        line += "\""
        if (row < ROWS - 1) line += ","

        mapString += line + "\n"
    }

    mapString += "]"

    console.log(mapString)
}

function loadLevel(map)
{
    for (let row = 0; row < ROWS; row++)
    {
        for (let col = 0; col < COLS; col++)
        {
            let char = map[row][col]

            if (char === " ") cells[row][col] = 0
            if (char === "#") cells[row][col] = 1
            if (char === ".") cells[row][col] = 2
            if (char === "+") cells[row][col] = 3
            if (char === "@") cells[row][col] = 4
            if (char === "^") cells[row][col] = 5
            if (char === "$") cells[row][col] = 6
        }
    }
}

const MAP = [
"############################################################",
"#                                              #           #",
"                                               #           #",
"                                                           #",
"                                                           #",
"                     #############                         #",
"#########            #           #                         #",
"#       #            #           #                         #",
"#       #            #           #                         #",
"#       ##############           #             #######     #",
"#       #                        ######   #    #     #     #",
"#       #                        #        #    #     #     #",
"#       #                        #        #    #           #",
"#       #                  #######        #    #           #",
"        #    #########     #              #    #           #",
"        #            #     #              #    #           #",
"        #            #     #              #    #     #     #",
"        #            #     #              #    #     #     #",
"#       #            #     #     ##########    #     #     #",
"#    ####            #     #              #    #     #######",
"#    #               #     #              #    #     #     #",
"#    #               #     #              #    #     #     #",
"#    #               #     #              #    #     #     #",
"#    #               #     #              #    #     #     #",
"#    #               #     #              #    #     #     #",
"#    #               #     ################    #######     #",
"#    #               #     #                   #     #     #",
"#    ############    #     #                   #           #",
"#               #    #     #                   #           #",
"#               #    #     #                   #           #",
"#               #    #     #        #          #           #",
"#               #    #     #        #          #     #     #",
"#               #    #     #        #          #     #     #",
"############    #    #     #        #          #     #     #",
"#               #    #     #        #          #     #     #",
"#               #    #     #        #          #     #     #",
"#               #    #     #        #          #     #     #",
"#               #    #     #    ##########     #     #######",
"#               #    #     #             #     #           #",
"#               #    #     #             #     #           #",
"#               #    #     #             #     #           #",
"#               #    #     ###############     #           #",
"#    ############    #                         #           #",
"#       #            #                         #     #     #",
"#       #            #                         #     #     #",
"#       #            #                         #     #     #",
"#       #            #                         #     #     #",
"#       #    ###################################     #     #",
"#       #                                            #     #",
"#       #                                            #     #",
"#       #                                            #     #",
"#       #                                            #     #",
"####    #    #       #################################     #",
"#       #    #       #                    #                #",
"#       ##############                    #                #",
"#                                                          #",
"#                                                          #",
"#                                  #             #         #",
"#                                  #             #         #",
"############################################################"
]