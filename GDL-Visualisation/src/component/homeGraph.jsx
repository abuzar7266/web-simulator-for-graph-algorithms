import React from "react";
import { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';
import "../assets/css/Graph.css"
const Graph = (props)=>{
    const graphRef = useRef();
    useEffect(()=>{
      var divX = d3.select("#"+props.id);
      divX.selectAll("svg > *").remove();
      var svg = divX.append("svg").attr("height",`${props.height}`).attr("width",`${props.width}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .classed("svg-content", true);
      var width = svg.attr("width");
      var height = svg.attr("height");

      var simmulation = d3
                      .forceSimulation(props.data.nodes)
                      .force(
                        "link",
                        d3
                          .forceLink()
                          .id(function(d) {
                            return d.id;
                          })
                          .links(props.data.links)
                      )
                      .force("charge",d3.forceManyBody().strength(props.strength))
                      .force("center",d3.forceCenter(width /2,height /2))
                      .on("tick",ticked);
      var link = svg
                  .append("g")
                  .attr("class","links")
                  .selectAll("line")
                  .data(props.data.links)
                  .enter()
                  .append("line")
                  .attr("stroke-width",function(d){
                    return 0.7;
                  })
                  .attr("stroke-linecap", "round")
                  .style("stroke","#6C3967");
      var node = svg
                 .append("g")
                 .selectAll("circle")
                 .data(props.data.nodes)
                 .enter()
                 .append("circle")
                 .attr("r",10)
                 .attr("fill",function(d){
                  return "#E66335";
                 })
                 .attr("stroke","#222B38")
                 .attr("stroke-width",function(d){
                  return 0.5;
                })
                 .call(
                    d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                );
      function ticked(){
          link
          .attr("x1",function(d){
            return d.source.x;
          })
          .attr("y1",function(d){
            return d.source.y;
          })
          .attr("x2",function(d){
            return d.target.x;
          })
          .attr("y2",function(d){
            return d.target.y;
          })
          node
          .attr("cx",function(d){
            return d.x;
          })
          .attr("cy",function(d){
            return d.y;
          })
      }
      function dragstarted(event) {
        if (!event.active) simmulation.alphaTarget(1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        console.log(d);
      }
    
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simmulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    })

    return (<> 
      <div id={props.id} style={{marginTop:props.marginTop,marginLeft:props.marginLeft,position:props.position,zIndex:props.zIndex}}>
      </div>
    </>)
}
export default Graph;