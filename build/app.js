(function (canvas,layers) {
    'use strict';

    const main = () =>
    {
        layers.background.render();
        layers.foreground.render();

        canvas.displayCtx.drawImage(canvas.canvas, 0, 0); // draw something visible only once per frame.

        requestAnimationFrame(main);
    };

    main();

}(canvas,layers));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWNvbGFzYnJ1Z25lYXV4L3dvcmtzcGFjZS9wcm9qZWN0cy9pc2FhYy5qcy9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc3BsYXlDdHgsIGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgYmFja2dyb3VuZC5yZW5kZXIoKTtcbiAgICBmb3JlZ3JvdW5kLnJlbmRlcigpO1xuXG4gICAgZGlzcGxheUN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwKTsgLy8gZHJhdyBzb21ldGhpbmcgdmlzaWJsZSBvbmx5IG9uY2UgcGVyIGZyYW1lLlxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxubWFpbigpO1xuIl0sIm5hbWVzIjpbImNhbnZhcyIsImRpc3BsYXlDdHgiLCJmb3JlZ3JvdW5kIiwiYmFja2dyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsTUFBTSxJQUFJLEdBQUc7QUFDYixJQUFBO0FBQ0EsSUFBQSxJQUFJRyxpQkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLElBQUEsSUFBSUQsaUJBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFeEIsSUFBQSxJQUFJRCxpQkFBVSxDQUFDLFNBQVMsQ0FBQ0QsYUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFdkMsSUFBQSxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLElBQUEsQ0FBQyxDQUFDOztBQUVGLElBQUEsSUFBSSxFQUFFLENBQUMsOzsifQ==