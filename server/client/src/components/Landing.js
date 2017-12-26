import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import Footer from './Footer';
import FeedTables from './feeds/FeedTables';
import { Segment, Container, Grid,Header, List, Divider, Image, Button, Menu, Icon, Table } from 'semantic-ui-react';

//const Landing = () => {
class Landing extends Component {

  constructor() {
		super();
  }


	render(){ 
		return (
		<div>
			<Segment
				inverted
				textAlign='center'
				style={{ minHeight: 700, padding: '1em 0em' }}
				vertical
				>
				<Container text>
					<Header
						as='h1'
						content='4Scroll'
						inverted
						style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
					/>
					<Header
						as='h2'
						content='A modern way to collect feeds!'
						inverted
						style={{ fontSize: '1.7em', fontWeight: 'normal' }}
					/>             
					<Button primary size='huge' as={Link} to={"/feeds"}>
						Get Started
						<Icon name='right arrow' />
					</Button>
				</Container>
			</Segment>

			<Segment style={{ padding: '0em' }} vertical>
			<Grid celled='internally' columns='equal' stackable>
				<Grid.Row textAlign='center'>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
				{/* <Grid.Column width={8}> */}
				<Header as='h3' style={{ fontSize: '2em' }}>We Help Companies and Companions</Header>
				<p style={{ fontSize: '1.33em' }}>
					We can give your company superpowers to do things that they never thought possible. Let us delight
					your customers and empower your needs... through pure data analytics.
				</p>

        

				</Grid.Column>
				<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
				<Header as='h3' style={{ fontSize: '2em' }}>We Make Bananas That Can Dance</Header>
					<p style={{ fontSize: '1.33em' }}>
					Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
					</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</Segment>

      <FeedTables />

			<Segment vertical style={{ padding: '5em 0em' }}>
			<Container>
				<Grid divided  stackable  columns='equal'>
				<Grid.Row textAlign='center'>
					<Grid.Column >
					<Header as='h3' style={{ fontSize: '1.5em' }}>Speeds up development</Header>
					<p>We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
					</Grid.Column>
					<Grid.Column >
					<Header  as='h3' content='User Experience Focused' style={{ fontSize: '1.5em' }}/>
					<p>By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
					</Grid.Column>
					<Grid.Column >
					<Header as='h3' style={{ fontSize: '1.5em' }} >Easy to work with</Header>
					<p>We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
					</Grid.Column>
				</Grid.Row>
				</Grid>
			</Container>
			</Segment>

			<Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
				<Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
				<p style={{ fontSize: '1.33em' }}>
				Instead of focusing on content creation and hard work, we have learned how to master the art of doing
				nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
				and worth your attention.
				</p>
				<Button as='a' size='large'>Read More</Button>
				<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}
				>
				<a href='#'>Case Studies</a>
				</Divider>
				<Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
				<p style={{ fontSize: '1.33em' }}>
				Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
				true.
				It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
				</p>
				<Button as='a' size='large'>I'm Still Quite Interested</Button>
			</Container>
			</Segment>     
			<Footer />
		</div>

		);
	}
}

export default Landing;
