let cells = []
let cnv 

const ROWS = 60
const COLS = 60
const CELLSIZE = 800 / 60

let currentValue = 1
let perimeterButton

function setup()
{
    cnv = createCanvas(800, 800)
    createGrid()

   
    perimeterButton = createButton("Fill Perimeter")
    perimeterButton.position(10, 810)
    perimeterButton.mousePressed(fillPerimeter)
    cnv.elt.oncontextmenu = () => false
}


function mousePressed(event)
{
    if (event.button === 2) 
    {
        paintCell(0)
        return false
    }
    else
    {
        paintCell(currentValue)
    }
}

function mouseDragged(event)
{
    if (event.button === 2)
    {
        paintCell(0)
        return false
    }
    else
    {
        paintCell(currentValue)
    }
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

    for (let row = 0; row < ROWS; row++)
    {
        for (let col = 0; col < COLS; col++)
        {
            let val = cells[row][col]

            if (val !== 0)
            {
                if (val === 1) fill(255, 0, 0)
                if (val === 2) fill(0, 255, 0)
                if (val === 3) fill(0, 0, 255)
                if (val === 4) fill(255, 255, 0)

                rect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE)
            }
        }
    }
}

function paintCell(value)
{
    let col = Math.floor(mouseX / CELLSIZE)
    let row = Math.floor(mouseY / CELLSIZE)

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
    {
        cells[row][col] = value
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
    if (key >= '0' && key <= '4')
    {
        currentValue = Number(key)
        console.log("Selected:", currentValue)
    }

    if (keyCode === 32)
    {
        let mapString = "const MAP = [\n"

        for (let row = 0; row < ROWS; row++)
        {
            let line = "\""

            for (let col = 0; col < COLS; col++)
            {
                let val = cells[row][col]

                if (val === 0) line += " " //empty
                if (val === 1) line += "#" //brick
                if (val === 2) line += "." // health
                if (val === 3) line += "+" //unarmed enemy
                if (val === 4) line += "@" //armed enemy
            }

            line += "\""

            if (row < ROWS - 1)
            {
                line += ","
            }

            mapString += line + "\n"
        }

        mapString += "]"

        console.log(mapString)
    }
}

