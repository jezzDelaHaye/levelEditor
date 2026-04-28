let cells = []

const ROWS = 60
const COLS = 60

let CELLSIZE
let currentValue = 1

let cnv
let perimeterButton

function setup()
{
    cnv = createCanvas(800, 800)

    CELLSIZE = width / COLS

    createGrid()

    perimeterButton = createButton("Fill Perimeter")
    perimeterButton.position(10, height + 10)
    perimeterButton.mousePressed(fillPerimeter)

    // disable right-click menu
    cnv.elt.oncontextmenu = () => false
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
    strokeWeight(1)

    for (let row = 0; row < ROWS; row++)
    {
        for (let col = 0; col < COLS; col++)
        {
            let val = cells[row][col]

            if (val === 0) continue

            if (val === 1) fill(255)         // brick White
            if (val === 2) fill(0, 255, 0)   // health Blue
            if (val === 3) fill(255, 140, 0) // unarmed enemy Orange
            if (val === 4) fill(255, 0, 0)   // armed enemy Red

            let x = col * CELLSIZE
            let y = row * CELLSIZE

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
    // select tile 0–4
    if (key >= '0' && key <= '4')
    {
        currentValue = Number(key)
    }

    // export
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
        }
    }
}

const MAP = [
"############################################################",
"#            #                              #              #",
"#            #                              #              #",
"#            #                              #              #",
"#            #                              #              #",
"#                                                          #",
"#                                                          #",
"#                      ##############                      #",
"#                      #            #                      #",
"#            #         #            #       #              #",
"#            #         #            #       #              #",
"#            #         #            #       #              #",
"#            #         #            #################    ###",
"#            #         #            #             #        #",
"#        ###############            #             #        #",
"#        #             #            #             #        #",
"#        #             #            #             #        #",
"#        #             #                          #        #",
"#        #             #                          #        #",
"#        #             #                          #        #",
"#        #             #                                   #",
"#        #             #            #                      #",
"#        #             #            #                      #",
"#        #             #            #                      #",
"#        #             #       ##############              #",
"#        #       ########    ###            #     #        #",
"##    #####    ###             #            #     #        #",
"#                #             #            #     #        #",
"#                #             #            #     #        #",
"#                #             #            #     #        #",
"#                #                          #     #        #",
"#                #                          ################",
"#                #                          #              #",
"#                #                          #              #",
"#                #             #            #              #",
"#         #############    #####            #              #",
"#         #         #          #            #              #",
"#         #         #          #            #              #",
"#                   #          ##################          #",
"#                   #              #            #          #",
"#                   #              #            #          #",
"#                   #              #            #          #",
"#         #         #              #                       #",
"#         #         #              #                       #",
"#         #         #              #                       #",
"#         #         #              #                       #",
"#         #         #              #            #          #",
"###    ##############              #            #          #",
"#              #    #              #     ##########      ###",
"#              #    #              #     #                 #",
"#              #    ##    ##########     #                 #",
"#              #           #             #                 #",
"#              #           #             #                 #",
"#              #                         #                 #",
"#              #                         #                 #",
"#              #                         #                 #",
"#              #                         #                 #",
"#              #           #             #                 #",
"#              #           #             #                 #",
"###     #########################################    #######"
]