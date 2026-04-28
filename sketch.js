let cells = []

const ROWS = 60
const COLS = 60
const CELLSIZE = 800 / 60

function setup()
{
    createCanvas(800, 800)
    createGrid()
}

function createGrid()
{
    for (let row = 0; row < ROWS; row++)
    {
        cells[row] = []
        for (let col = 0; col < COLS; col++)
        {
            cells[row][col] = false
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
            if (cells[row][col])
            {
                fill(255, 0, 0)
                rect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE)
            }
        }
    }
}

function mousePressed()
{
    paintCell()
}

function mouseDragged()
{
    paintCell()
}

function paintCell()
{
    let col = Math.floor(mouseX / CELLSIZE)
    let row = Math.floor(mouseY / CELLSIZE)

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
    {
        cells[row][col] = true
    }
}

function keyPressed()
{
    if (keyCode === 32) 
    {
        let mapString = "const MAP = [\n"

        for (let row = 0; row < ROWS; row++)
        {
            let line = "\""

            for (let col = 0; col < COLS; col++)
            {
                line += cells[row][col] ? "#" : " "
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