package main

import (
	"github.com/labstack/echo"
	"github.com/yuziroppe/we_wanna_eat_Jiro/backend/handler"
)

func main() {
	e := echo.New()
	e.GET("/", handler.HelloWorld)
	e.Logger.Fatal(e.Start(":1323"))
}
