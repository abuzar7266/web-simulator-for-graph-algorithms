import React from "react";
import lesMis from '../assets/json/graph.js'; 
import Graph from "../component/Graph.jsx";
import { Container,Col,Row } from "react-bootstrap";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
var data1 = {
  nodes:[
    {id:0},
    {id:1},
    {id:2},
    {id:3},
    {id:4}
  ],
  links:[
    {source:0,target:1},
    {source:0,target:4},
    {source:1,target:2},
    {source:3,target:2},
    {source:4,target:3},
  ]
}
var data2 = {
  nodes:[
    {id:0},
    {id:1},
    {id:2},
    {id:3},
    {id:4}
  ],
  links:[
    {source:0,target:3},
    {source:0,target:2},
    {source:4,target:2},
    {source:4,target:1},
    {source:1,target:3},
  ]
}
var data3 = {
  nodes:[
    {id:0},
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6}
  ],
  links:[
    {source:0,target:3},
    {source:0,target:2},
    {source:4,target:2},
    {source:4,target:1},
    {source:1,target:3},
    {source:5,target:3},
    {source:5,target:2},
    {source:6,target:2},
    {source:5,target:1},
    {source:6,target:3}
  ]
}
const Test = ()=>{
  const [graph1,setGraph1] = useState({
    nodes:[...lesMis.nodes],
    links:[...lesMis.links]
  });
  const [stateGet,setStateGet] = useState(0);
  const [numVis,setNumVis] = useState(0);
  const [mapping,setMapping] = useState([])
  const [iter,setIter] = useState({
    source:0,
    count:-1,
    length:-1
  })
  const [statusG1,setStatusG1] = useState(1);
  useEffect(()=>{
    if(stateGet==0){
      axios.get('http://127.0.0.1:5000/GNNGraph',{})
        .then((result)=>{
          setMapping(result['data']['Mapping'])
          setStateGet(1)
        })
    }
  },[])
  useEffect(()=>{
    console.log('Dum UseEffect called');
    if(stateGet==1){
      if(numVis==0){
        if(iter.count==iter.length & iter.source<56){
          for(var i=0;i<graph1.links.length;i++){
            graph1.links[i].color=0
          }
          if(iter.source>0){
            graph1.nodes[iter.source-1].color = 2;
          }
          graph1.nodes[iter.source].color = 1;
          setGraph1({nodes:graph1.nodes,links:graph1.links});
          setIter({source:iter.source+1,length:mapping[iter.source+1].length,count:0});
          setStatusG1(0);
        }
        else if(iter.count==iter.length & iter.source==56){
          for(var i=0;i<graph1.links.length;i++){
            graph1.links[i].color=0
          }
          graph1.nodes[iter.source-1].color = 2;
          setGraph1({nodes:graph1.nodes,links:graph1.links});
          setNumVis(1);
          setStatusG1(0);
        }
        else{
          var visCurr = mapping[`${iter.source}`][iter.count];
          var idx = -1;
          idx = graph1.links.findIndex((data)=>{
            if(data.source.id==visCurr.source && data.target.id==visCurr.target){
                return data.index;
            }
          });
          if(idx<=-1){
            idx = 0;
          }
          if(idx>=0){
            var l = graph1.links[idx];
            l.color = 1;
            graph1.links[idx] = l;
            setGraph1({nodes:graph1.nodes,links:graph1.links});
            setIter({...iter,count:iter['count']+1});
          }
          else{
            setIter({...iter,count:iter.count});
          }
          setStatusG1(0);
        }
      }
    }
  },[stateGet,graph1])
    return (<>
    <Container style={{marginTop:'200px'}}>
      <Row style={{marginTop:'100px'}}>
      <Container style={{height:'700px',width:'1400px'}} fluid>
        <Row>
          <Col>
            <Graph id="p1" height={500} width={700} strength={-70} position="absolute" zIndex="2" data={graph1}/>
          </Col>
        </Row>
        <Row
        style={{marginLeft:'100px'}}
        >
            <Col
            md={7}
            lg={7}
            xl={7}
            >
                <h3>
                  Geometric Deep Learning
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Geometric Deep Learning is the sub-branch of deep learning that deals with neural networks working on non-euclidean data. It is not possible to apply neural networks based on euclidean data on complex types of data like graphs or multi-dimensional structures. Recently more and more types of data are being represented as graphs due to its better expressivity. Namely the rise in social media has greatly increased the need for neural networks capable of dealing with non-euclidean data due to social network graphs. These frameworks are also capable of dealing with even more complex types of data like manifolds.</p>
            </Col>
        </Row>
      </Container>
      </Row>
      {/*<Row>
      <Container style={{height:'700px',width:'1400px'}} fluid>
        <Row>
          <Col md={6} lg={6} xl={6}>
            <Graph id="p2" height={500} width={700} strength={-40} position="absolute" zIndex="2" data={lesMis}/>
          </Col>
        </Row>
        <Row style={{marginLeft:'100px'}}>
            <Col
            md={7}
            lg={7}
            xl={7}
            >
                <h3>
                  Graph Neural Network
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Donec nec condimentum est. Nunc eu sapien quis augue lacinia elementum. Nulla at sem non nibh dignissim venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla placerat posuere mollis. Curabitur gravida lacus at nunc sollicitudin, non feugiat nisi maximus. Ut scelerisque orci sit amet ex varius lacinia. Proin ut lorem et risus imperdiet pellentesque ac vel nisl. Donec gravida tellus ac volutpat gravida. Suspendisse ultrices leo ac vehicula sodales. Mauris accumsan magna nec tellus iaculis bibendum. Nunc ut placerat turpis, sed accumsan eros. Suspendisse volutpat erat nibh, vel interdum mi aliquet in. Pellentesque eu tincidunt tortor, nec mollis dolor.</p>
            </Col>
        </Row>
      </Container>
      </Row>
      <Row>
      <Container style={{height:'700px',width:'1400px'}} fluid>
        <Row>
          <Col md={6} lg={6} xl={6}>
            <Graph id="p3" height={500} width={700} strength={-40} position="absolute" zIndex="2" data={lesMis}/>
          </Col>
        </Row>
        <Row style={{marginLeft:'100px'}}>
            <Col
            md={6}
            lg={6}
            xl={6}
            >
                <h3>
                  k-Wesfeiler-Lehman Test
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Donec nec condimentum est. Nunc eu sapien quis augue lacinia elementum. Nulla at sem non nibh dignissim venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla placerat posuere mollis. Curabitur gravida lacus at nunc sollicitudin, non feugiat nisi maximus. Ut scelerisque orci sit amet ex varius lacinia. Proin ut lorem et risus imperdiet pellentesque ac vel nisl. Donec gravida tellus ac volutpat gravida. Suspendisse ultrices leo ac vehicula sodales. Mauris accumsan magna nec tellus iaculis bibendum. Nunc ut placerat turpis, sed accumsan eros. Suspendisse volutpat erat nibh, vel interdum mi aliquet in. Pellentesque eu tincidunt tortor, nec mollis dolor.</p>
            </Col>
        </Row>
      </Container>
      </Row>
      <Row>
      <Container style={{height:'700px',width:'1400px'}} fluid>
        <Row>
          <Col md={6} lg={6} xl={6}>
            <Graph id="p4" height={500} width={700} strength={-40} position="absolute" zIndex="2" data={lesMis}/>
          </Col>
        </Row>
        <Row style={{marginLeft:'100px'}}>
            <Col
            md={7}
            lg={7}
            xl={7}
            >
                <h3>
                  K-Wesfeiler Lehman
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Donec nec condimentum est. Nunc eu sapien quis augue lacinia elementum. Nulla at sem non nibh dignissim venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla placerat posuere mollis. Curabitur gravida lacus at nunc sollicitudin, non feugiat nisi maximus. Ut scelerisque orci sit amet ex varius lacinia. Proin ut lorem et risus imperdiet pellentesque ac vel nisl. Donec gravida tellus ac volutpat gravida. Suspendisse ultrices leo ac vehicula sodales. Mauris accumsan magna nec tellus iaculis bibendum. Nunc ut placerat turpis, sed accumsan eros. Suspendisse volutpat erat nibh, vel interdum mi aliquet in. Pellentesque eu tincidunt tortor, nec mollis dolor.</p>
            </Col>
        </Row>
      </Container>
      </Row>
      <Row>
      <Container style={{height:'700px',width:'1400px'}} fluid>
        <Row>
        <Col md={6} lg={6} xl={6}>
            <Graph id="p5" height={500} width={700} strength={-40} position="absolute" zIndex="2" data={lesMis}/>
          </Col>
        </Row>
        <Row style={{marginLeft:'100px'}}>
            <Col
            md={6}
            lg={6}
            xl={6}
            >
                <h3>
                  Graph Isomorphism
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Donec nec condimentum est. Nunc eu sapien quis augue lacinia elementum. Nulla at sem non nibh dignissim venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla placerat posuere mollis. Curabitur gravida lacus at nunc sollicitudin, non feugiat nisi maximus. Ut scelerisque orci sit amet ex varius lacinia. Proin ut lorem et risus imperdiet pellentesque ac vel nisl. Donec gravida tellus ac volutpat gravida. Suspendisse ultrices leo ac vehicula sodales. Mauris accumsan magna nec tellus iaculis bibendum. Nunc ut placerat turpis, sed accumsan eros. Suspendisse volutpat erat nibh, vel interdum mi aliquet in. Pellentesque eu tincidunt tortor, nec mollis dolor.</p>
            </Col>
        </Row>
      </Container>
      </Row>
      <Row>
      <Container style={{height:'700px',width:'1400px'}}>
        <Row>
        <Col>
            <Graph id="p6" height={500} width={700} strength={-40} position="absolute" zIndex="2" data={lesMis}/>
          </Col>
        </Row>
        <Row style={{marginLeft:'100px'}}>
            <Col
            md={7}
            lg={7}
            xl={7}
            >
                <h3>
                  PlaceHolder
                </h3>
                <p style={{textAlign:'center',fontSize:'23px',opacity:'70%'}}>Donec nec condimentum est. Nunc eu sapien quis augue lacinia elementum. Nulla at sem non nibh dignissim venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla placerat posuere mollis. Curabitur gravida lacus at nunc sollicitudin, non feugiat nisi maximus. Ut scelerisque orci sit amet ex varius lacinia. Proin ut lorem et risus imperdiet pellentesque ac vel nisl. Donec gravida tellus ac volutpat gravida. Suspendisse ultrices leo ac vehicula sodales. Mauris accumsan magna nec tellus iaculis bibendum. Nunc ut placerat turpis, sed accumsan eros. Suspendisse volutpat erat nibh, vel interdum mi aliquet in. Pellentesque eu tincidunt tortor, nec mollis dolor.</p>
            </Col>
        </Row>
      </Container>
    </Row>*/}
    </Container>
    </>)
}
export default Test;