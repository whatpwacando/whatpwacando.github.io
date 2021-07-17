import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { off } from 'process';
import { Observable } from 'rxjs';
import { data } from './data';
import pako from 'pako';

declare const QRCode: any;

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent implements OnInit {

  @ViewChild('container', { static: true }) codeContainer: ElementRef;
  currentCode = 1;
  totalCodes = 0;
  dataArray = [];
  codeInstance = null;
  qrCodeText = '123';
  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const text = `
    Schlumberger was founded in 1926 by two brothers Conrad and Marcel Schlumberger from the Alsace region in France as the Electric Prospecting Company (French: Société de prospection électrique). The company recorded the first-ever electrical resistivity well log in Merkwiller-Pechelbronn, France in 1927. Today, Schlumberger supplies the petroleum industry with services such as seismic acquisition and processing, formation evaluation, well testing and directional drilling, well cementing and stimulation, artificial lift, well completions, flow assurance and consulting, and software and information management. The company is also involved in the groundwater extraction[10] and carbon capture and storage industries.[11]

The Schlumberger brothers had experience conducting geophysical surveys in countries such as Romania, Canada, Serbia, South Africa, the Democratic Republic of the Congo and the United States. The new company sold electrical-measurement mapping services, and recorded the first-ever electrical resistivity well log in Merkwiller-Pechelbronn, France in 1927. The company quickly expanded, logging its first well in the U.S. in 1929, in Kern County, California. In 1935, the Schlumberger Well Surveying Corporation was founded in Houston, later evolving into Schlumberger Well Services, and finally Schlumberger Wireline and Testing. Schlumberger invested heavily in research, inaugurating the Schlumberger-Doll Research Center in Ridgefield, Connecticut in 1948, contributing to the development of a number of new logging tools. In 1956, Schlumberger Limited was incorporated as a holding company for all Schlumberger businesses, which by now included American testing and production company Johnston Testers.[citation needed]

Over the years, Schlumberger continued to expand its operations and acquisitions. In 1960, Dowell Schlumberger (50% Schlumberger, 50% Dow Chemical), which specialized in pumping services for the oil industry, was formed. In 1962, Schlumberger Limited became listed on the New York Stock Exchange.[12] That same year, Schlumberger purchased Daystrom, an electronic instruments manufacturer in South Boston, Virginia which was making furniture by the time the division was sold to Sperry & Hutchinson in 1971.[13] Schlumberger purchased 50% of Forex in 1964 and merged it with 50% of Languedocienne to create the Neptune Drilling Company. The first computerized reservoir analysis, SARABAND, was introduced in 1970. The remaining 50% of Forex was acquired the following year; Neptune was renamed Forex Neptune Drilling Company. In 1979, Fairchild Camera and Instrument (including Fairchild Semiconductor) became a subsidiary of Schlumberger Limited.

In 1981, Schlumberger established the first international data links with e-mail. In 1983, Schlumberger opened its Cambridge Research Center in Cambridge, England and in 2012 it was renamed the Schlumberger Gould Research Center after the company's former CEO Andrew Gould.[14]

The SEDCO drilling rig company and half of Dowell of North America were acquired in 1984, resulting in the creation of the Anadrill drilling segment, a combination of Dowell and The Analysts' drilling segments. Forex Neptune was merged with SEDCO to create the Sedco Forex Drilling Company the following year, when Schlumberger purchased Merlin and 50% of GECO.[citation needed]

In 1987, Schlumberger completed its purchases of Neptune (North America), Bosco and Cori (Italy), and Allmess (Germany). That same year, National Semiconductor acquired Fairchild Semiconductor from Schlumberger for $122 million.[15]

In 1991, Schlumberger acquired PRAKLA-SEISMOS, and pioneered the use of geosteering to plan the drill path in horizontal wells.[citation needed]

In 1992, Schlumberger acquired software company GeoQuest Systems. With the purchase came the conversion of SINet to TCP/IP and thus internet capable. In the 1990s Schlumberger bought out the petroleum division, AEG meter, and ECLIPSE reservoir study team Intera Technologies Corp. A joint venture between Schlumberger and Cable & Wireless resulted with the creation of Omnes, which then handled all of Schlumberger's internal IT business. Oilphase and Camco International were also purchased.[citation needed]

In 1999, Schlumberger and Smith International created a joint venture, M-I L.L.C., the world's largest drilling fluids (mud) company. The company consists of 60% Smith International, and 40% Schlumberger. Since the joint venture was prohibited by a 1994 antitrust consent decree barring Smith from selling or combining their fluids business with certain other companies, including Schlumberger, the U.S. District Court in Washington, D.C. found Smith International Inc. and Schlumberger Ltd. guilty of criminal contempt and fined each company $750,000 and placed each company on five years probation. Both companies also agreed to pay a total of $13.1 million, representing a full disgorgement of all of the joint venture's profits during the time the companies were in contempt.[16]

In 2000, the Geco-Prakla division was merged with Western Geophysical to create the seismic contracting company WesternGeco, of which Schlumberger held a 70% stake, the remaining 30% belonging to competitor Baker Hughes. Sedco Forex was spun off, and merged with Transocean Drilling company in 2000.[citation needed]

In 2001, Schlumberger acquired the IT consultancy company Sema plc for $5.2 billion. The company was an Athens 2004 Summer Olympics partner, but Schlumberger's venture into IT consultancy did not pay off, and divestiture of Sema to Atos Origin was completed that year for $1.5 billion. The cards division was divested through an IPO to form Axalto, which later merged with Gemplus to form Gemalto, and the Messaging Solutions unit was spun off and merged with Taral Networks to form Airwide Solutions. In 2003, the Automated Test Equipment group, part of the 1979 Fairchild Semiconductor acquisition, was spun off to NPTest Holding, which later sold it to Credence.[citati`;

    this.qrCodeText = btoa(pako.deflate(text, { to: 'string' }));

  }
  onExist(): void {
    this.router.navigate([`../dashboard`], { relativeTo: this.route });
  }
}
