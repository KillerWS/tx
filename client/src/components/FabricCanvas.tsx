import React, { useEffect } from 'react';
import { Canvas, Rect, Line, FabricImage } from 'fabric';

const FabricCanvas = () => {
  useEffect(() => {
    const canvas = new Canvas('c');

    // 创建一个黑色的矩形
    const rect = new Rect({
      left: 150,
      top: 100,
      fill: 'black',
      width: 100,
      height: 100,
      angle: 0,
      strokeWidth: 2,
      selectable: true,
    });

    // 将矩形添加到画布中
    canvas.add(rect);

    // 加载图片
    const image = new Image();
    image.src = 'http://www.baidu.com/img/bdlogo.png';

    // 图片加载完毕后再添加到画布
    image.onload = () => {
      const fabricImage = new FabricImage(image);

      fabricImage.set({
        left: 400,
        top: 100,
        angle: 0,
        selectable: true,
      });

      canvas.add(fabricImage);

      // 创建用于绘制描边的线条
      const line1 = new Line([0, 0, 0, 0], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line2 = new Line([0, 0, 0, 0], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line3 = new Line([0, 0, 0, 0], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line4 = new Line([0, 0, 0, 0], { stroke: 'red', selectable: false, strokeWidth: 3 });

      const imagePoints = fabricImage.getCoords();
      const line5 = new Line([imagePoints[0].x, imagePoints[0].y, imagePoints[1].x, imagePoints[1].y], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line6 = new Line([imagePoints[1].x, imagePoints[1].y, imagePoints[2].x, imagePoints[2].y], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line7 = new Line([imagePoints[2].x, imagePoints[2].y, imagePoints[3].x, imagePoints[3].y], { stroke: 'red', selectable: false, strokeWidth: 3 });
      const line8 = new Line([imagePoints[3].x, imagePoints[3].y, imagePoints[0].x, imagePoints[0].y], { stroke: 'red', selectable: false, strokeWidth: 3 });

      canvas.add(line1, line2, line3, line4);
      canvas.add(line5, line6, line7, line8);

      const updateBorderLines = () => {
        const points = rect.getCoords();
        const points1 = fabricImage.getCoords();

        // 打印四个点的坐标信息
        console.log('Top-Left:', points[0]);
        console.log('Top-Right:', points[1]);
        console.log('Bottom-Right:', points[2]);
        console.log('Bottom-Left:', points[3]);

        console.log('Top-Left:', points1[0]);
        console.log('Top-Right:', points1[1]);
        console.log('Bottom-Right:', points1[2]);
        console.log('Bottom-Left:', points1[3]);

        // 更新每条线的位置
        line1.set({ x1: points[0].x, y1: points[0].y, x2: points[1].x, y2: points[1].y });
        line2.set({ x1: points[1].x, y1: points[1].y, x2: points[2].x, y2: points[2].y });
        line3.set({ x1: points[2].x, y1: points[2].y, x2: points[3].x, y2: points[3].y });
        line4.set({ x1: points[3].x, y1: points[3].y, x2: points[0].x, y2: points[0].y });

        line5.set({ x1: points1[0].x, y1: points1[0].y, x2: points1[1].x, y2: points1[1].y });
        line6.set({ x1: points1[1].x, y1: points1[1].y, x2: points1[2].x, y2: points1[2].y });
        line7.set({ x1: points1[2].x, y1: points1[2].y, x2: points1[3].x, y2: points1[3].y });
        line8.set({ x1: points1[3].x, y1: points1[3].y, x2: points1[0].x, y2: points1[0].y });

        canvas.renderAll();
      };

      // 初始化时更新描边
      updateBorderLines();

      // 在对象被修改时更新描边
      rect.on('modified', updateBorderLines);
      rect.on('moving', updateBorderLines);
      rect.on('scaling', updateBorderLines);
      rect.on('rotating', updateBorderLines);

      fabricImage.on('modified', updateBorderLines);
      fabricImage.on('moving', updateBorderLines);
      fabricImage.on('scaling', updateBorderLines);
      fabricImage.on('rotating', updateBorderLines);
    };

    // 清理函数，组件卸载时销毁画布实例
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas id="c" width="800" height="600" />
  );
};

export default FabricCanvas;
