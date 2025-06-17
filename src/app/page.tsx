"use client";
import { useEffect } from 'react';
import Globe from './components/Globe';
import { BASE_URL } from "@/utils/baseUrl";
const baseUrl = `${BASE_URL}`;

export default function Home() {
  
  useEffect(() => {
    const countriesEl = document.getElementById("countries");
    const viewBtn = document.getElementById("viewCountriesBtn");
    const currencySelect = document.getElementById("currency");
    const searchInput = document.querySelector(".searchInput");

    const currencyPopulate = (cntry: string) => {
      console.log(cntry)
      fetch("/frontend/js/pricing.json")
        .then((res) => res.json())
        .then((data) => {
          if (!countriesEl) return;
          countriesEl.innerHTML = "";
          data.forEach((item: any) => {
            const div = document.createElement("div");
            div.className = "col-lg-4 col-md-6";
            div.innerHTML = `
              <div class="countryName">
                <img src="${baseUrl}/countries/${item.image}.png" alt="${item.title}" />
                <h6>${item.title}</h6>
              </div>
              <div class="gbPrice">${item[cntry]}</div>
            `;
            countriesEl.appendChild(div);
          });
        })
        .catch((err) => console.error("Error loading pricing data:", err));
    };

    viewBtn?.addEventListener("click", () => {
      countriesEl?.classList.add("active");
      viewBtn.classList.add("d-none");
    });

    currencySelect?.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      countriesEl?.classList.remove("active");
      countriesEl!.innerHTML = "";
      viewBtn?.classList.remove("d-none");
      currencyPopulate(target.value);
    });

    searchInput?.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const searchValue = target.value.toLowerCase();
      countriesEl?.classList.add("active");
      viewBtn?.classList.add("d-none");

      const cards = countriesEl?.querySelectorAll(".col-lg-4") || [];
      cards.forEach((card) => {
        const name = card.querySelector(".countryName h6")?.textContent?.toLowerCase() || "";
        (card as HTMLElement).style.display = name.includes(searchValue) ? "flex" : "none";
      });
    });

    currencyPopulate("USD");
  }, []);

  useEffect(() => {
    document.querySelectorAll(".tabBtn").forEach(element => {
      element.addEventListener("click", ()=>{
        console.clear();
        if(element.classList.contains("active") == false){
          document.querySelector(".tab.active")?.classList.remove("active");
          document.querySelector(".tabBtn.active")?.classList.remove("active");
          element.classList.add("active");
          document.getElementById(element.getAttribute('tab-name'))?.classList.add("active")
        }
      })
    });
  }, []);
  return (
    <>
         <section id="home">
            <div className="content">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <h1><span>Connect Online</span> without the bother of Country Bountries</h1>
                        <form id="login">
                          <input id="email" type="email" name="email" placeholder="contact@email.com"/>
                          <input type="submit" className="mainBtn" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
            </div>
            <div className="cloud-bg"></div>
            <div className="cloud-fg"></div>
            <div id="globe"></div>
        </section>
        <section className="sectionPad" id="pricing">
            <div className="container">
                <h3 className="sectionHead center">Global Data <span>Pricing</span> from $ 1.27<i>PER GB</i></h3>
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8 col-lg-6">
                        <div className="search">
                            <select name="currency" id="currency" className="currency" defaultValue="USD"> 
                                <option value="AUD">AUD</option>
                                <option value="AED">AED</option>
                                <option value="CAD">CAD</option>
                                <option value="CHF">CHF</option>
                                <option value="CNY">CNY</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="HKD">HKD</option>
                                <option value="INR">INR</option>
                                <option value="JPY">JPY</option>
                                <option value="KRW">KRW</option>
                                <option value="MXN">MXN</option>
                                <option value="NOK">NOK</option>
                                <option value="NZD">NZD</option>
                                <option value="SEK">SEK</option>
                                <option value="SGD">SGD</option>
                                <option value="TRY">TRY</option>
                                <option value="USD">USD</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                            <input type="search" className="searchInput" placeholder="Search Country" name="search"/>
                            <i className="fa-solid fa-search"></i>
                        </div>
                    </div>
                </div>
                <div className="row" id="countries">
                </div>
                <div className="mt-4">
                    <button type="button" id="viewCountriesBtn">View All Countries<i className="fa-solid fa-chevron-down"></i></button>
                </div>
            </div>
        </section>
        <section id="plan" className="sectionPad">
            <div className="container">
                <h3 className="sectionHead center"><span>SafariSim</span> Plans and  Pricing</h3>
                <div className="tabBtns">
                    <button type="button" tab-name="global-plan" className="tabBtn active">Global Plans</button>
                    <button type="button" tab-name="country-plan" className="tabBtn">Country Plans</button>
                </div>
                <div className="tabDiv">
                    <div className="tab active" id="global-plan">
                        <div className="row row-gap-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>1 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$6.99</del><p className="mb-0">$5.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>3 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$17.99</del><p className="mb-0">$14.39</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>5 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$24.99</del><p className="mb-0">$19.99</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>10 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$41.99</del><p className="mb-0">$33.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>20 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$66.99</del><p className="mb-0">$53.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>∞ GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><p className="mb-0">$3.84 <span>per day</span></p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab" id="country-plan">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6 col-lg-4">
                                <select name="country-select" id="country-select" className="neoSelect">
                                    <option value="afghanistan" >Afghanistan</option>
                                    <option value="albania" >Albania</option>
                                    <option value="andorra" >Andorra</option>
                                    <option value="anguilla" >Anguilla</option>
                                    <option value="antigua and barbuda" >Antigua & Barbuda</option>
                                    <option value="argentina" >Argentina</option>
                                    <option value="armenia" >Armenia</option>
                                    <option value="australia" >Australia</option>
                                    <option value="austria" >Austria</option>
                                    <option value="azerbaijan" >Azerbaijan</option>
                                    <option value="bahamas" >Bahamas</option>
                                    <option value="bahrain" >Bahrain</option>
                                    <option value="bangladesh" >Bangladesh</option>
                                    <option value="barbados" >Barbados</option>
                                    <option value="belarus" >Belarus</option>
                                    <option value="belgium" >Belgium</option>
                                    <option value="belize" >Belize</option>
                                    <option value="bermuda" >Bermuda</option>
                                    <option value="bolivia" >Bolivia</option>
                                    <option value="bosnia and herzegovina" >Bosnia & Herzegovina</option>
                                    <option value="brazil" >Brazil</option>
                                    <option value="british virgin islands" >British Virgin Islands</option>
                                    <option value="bulgaria" >Bulgaria</option>
                                    <option value="cambodia" >Cambodia</option>
                                    <option value="canada" >Canada</option>
                                    <option value="cape verde" >Cape Verde</option>
                                    <option value="cayman islands" >Cayman Islands</option>
                                    <option value="chad" >Chad</option>
                                    <option value="chile" >Chile</option>
                                    <option value="china" >China</option>
                                    <option value="colombia" >Colombia</option>
                                    <option value="republic of the congo" >Congo - Brazzaville</option>
                                    <option value="democratic republic of congo" >Congo - Kinshasa</option>
                                    <option value="costa rica" >Costa Rica</option>
                                    <option value="croatia" >Croatia</option>
                                    <option value="curacao" >Curaçao</option>
                                    <option value="cyprus" >Cyprus</option>
                                    <option value="czech republic" >Czechia</option>
                                    <option value="denmark" >Denmark</option>
                                    <option value="dominica" >Dominica</option>
                                    <option value="dominican republic" >Dominican Republic</option>
                                    <option value="ecuador" >Ecuador</option>
                                    <option value="egypt" >Egypt</option>
                                    <option value="el salvador" >El Salvador</option>
                                    <option value="estonia" >Estonia</option>
                                    <option value="faroe islands" >Faroe Islands</option>
                                    <option value="fiji" >Fiji</option>
                                    <option value="finland" >Finland</option>
                                    <option value="france" >France</option>
                                    <option value="gambia" >Gambia</option>
                                    <option value="georgia" >Georgia</option>
                                    <option value="germany" >Germany</option>
                                    <option value="ghana" >Ghana</option>
                                    <option value="grenada" >Grenada</option>
                                    <option value="guatemala" >Guatemala</option>
                                    <option value="haiti" >Haiti</option>
                                    <option value="honduras" >Honduras</option>
                                    <option value="hong kong" >Hong Kong SAR China</option>
                                    <option value="hungary" >Hungary</option>
                                    <option value="iceland" >Iceland</option>
                                    <option value="india" >India</option>
                                    <option value="indonesia" >Indonesia</option>
                                    <option value="ireland" >Ireland</option>
                                    <option value="israel" >Israel</option>
                                    <option value="italy" >Italy</option>
                                    <option value="jamaica" >Jamaica</option>
                                    <option value="japan" >Japan</option>
                                    <option value="jordan" >Jordan</option>
                                    <option value="kazakhstan" >Kazakhstan</option>
                                    <option value="kenya" >Kenya</option>
                                    <option value="kuwait" >Kuwait</option>
                                    <option value="laos" >Laos</option>
                                    <option value="latvia" >Latvia</option>
                                    <option value="liechtenstein" >Liechtenstein</option>
                                    <option value="lithuania" >Lithuania</option>
                                    <option value="luxembourg" >Luxembourg</option>
                                    <option value="macao" >Macao SAR China</option>
                                    <option value="malaysia" >Malaysia</option>
                                    <option value="maldives" >Maldives</option>
                                    <option value="malta" >Malta</option>
                                    <option value="mauritius" >Mauritius</option>
                                    <option value="mexico" >Mexico</option>
                                    <option value="moldova" >Moldova</option>
                                    <option value="monaco" >Monaco</option>
                                    <option value="mongolia" >Mongolia</option>
                                    <option value="montenegro" >Montenegro</option>
                                    <option value="montserrat" >Montserrat</option>
                                    <option value="morocco" >Morocco</option>
                                    <option value="mozambique" >Mozambique</option>
                                    <option value="myanmar" >Myanmar (Burma)</option>
                                    <option value="namibia" >Namibia</option>
                                    <option value="nepal" >Nepal</option>
                                    <option value="netherlands" >Netherlands</option>
                                    <option value="new zealand" >New Zealand</option>
                                    <option value="nicaragua" >Nicaragua</option>
                                    <option value="nigeria" >Nigeria</option>
                                    <option value="republic of macedonia" >North Macedonia</option>
                                    <option value="norway" >Norway</option>
                                    <option value="oman" >Oman</option>
                                    <option value="pakistan" >Pakistan</option>
                                    <option value="panama" >Panama</option>
                                    <option value="papua new guinea" >Papua New Guinea</option>
                                    <option value="paraguay" >Paraguay</option>
                                    <option value="peru" >Peru</option>
                                    <option value="philippines" >Philippines</option>
                                    <option value="poland" >Poland</option>
                                    <option value="portugal" >Portugal</option>
                                    <option value="qatar" >Qatar</option>
                                    <option value="romania" >Romania</option>
                                    <option value="russia" >Russia</option>
                                    <option value="rwanda" >Rwanda</option>
                                    <option value="san marino" >San Marino</option>
                                    <option value="saudi arabia" >Saudi Arabia</option>
                                    <option value="serbia" >Serbia</option>
                                    <option value="seychelles" >Seychelles</option>
                                    <option value="singapore" >Singapore</option>
                                    <option value="slovakia" >Slovakia</option>
                                    <option value="slovenia" >Slovenia</option>
                                    <option value="south africa" >South Africa</option>
                                    <option value="south korea" >South Korea</option>
                                    <option value="spain" >Spain</option>
                                    <option value="st vincent and the grenadines" >St. Vincent & Grenadines</option>
                                    <option value="sweden" >Sweden</option>
                                    <option value="switzerland" >Switzerland</option>
                                    <option value="taiwan" >Taiwan</option>
                                    <option value="tanzania" >Tanzania</option>
                                    <option value="thailand" >Thailand</option>
                                    <option value="trinidad and tobago" >Trinidad & Tobago</option>
                                    <option value="tunisia" >Tunisia</option>
                                    <option value="turkey" >Türkiye</option>
                                    <option value="uganda" >Uganda</option>
                                    <option value="ukraine" >Ukraine</option>
                                    <option value="united arab emirates" >United Arab Emirates</option>
                                    <option value="united kingdom" >United Kingdom</option>
                                    <option value="united states" >United States</option>
                                    <option value="uruguay" >Uruguay</option>
                                    <option value="uzbekistán" >Uzbekistan</option>
                                    <option value="vietnam" >Vietnam</option>
                                    <option value="zambia" >Zambia</option>
                                    <option value="zimbabwe" >Zimbabwe</option>
                                </select>
                            </div>
                        </div>
                        <div className="row row-gap-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>1 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$6.99</del><p className="mb-0">$5.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>3 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$17.99</del><p className="mb-0">$14.39</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>5 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$24.99</del><p className="mb-0">$19.99</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>10 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$41.99</del><p className="mb-0">$33.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>20 GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><del>$66.99</del><p className="mb-0">$53.59</p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="planCard">
                                    <h4 className="planName">Global Plan</h4><h5>∞ GB</h5>
                                    <div className="offer">NOW 20% OFF</div>
                                    <div className="coverage">Coverage: <span>4G/5G</span></div>
                                    <button className="spec">eSIM Specification</button>
                                    <div className="price"><p className="mb-0">$3.84 <span>per day</span></p></div>
                                    <button type="button" className="countryList">Country List</button>
                                    <div><button className="mainBtn">Add to Cart</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="sectionPad" id="why">
            <div className="container">
                <h3 className="sectionHead center">Why Choose our <span>eSIM</span> Solution</h3>
                <div className="row row-gap-4">
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-wifi"></i></div>
                            <h5>Instant Connectivity</h5>
                            <p className="mb-0">Connect within minutes of purchase, no physical SIM card required.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-credit-card"></i></div>
                            <h5>Affordable Plans</h5>
                            <p className="mb-0">Save up to 70% compared to traditional roaming charges.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-phone"></i></div>
                            <h5>Compatible Devices</h5>
                            <p className="mb-0">Works with all eSIM-compatible smartphones and tablets.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-clock"></i></div>
                            <h5>Flexible Duration</h5>
                            <p className="mb-0">Choose from daily, weekly or monthly plans based on your needs.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-shield"></i></div>
                            <h5>Secure Connection</h5>
                            <p className="mb-0">Enterprise-grade security for all your data transmissions.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 d-grid">
                        <div className="whyCard">
                            <div className="icon"><i className="fa-solid fa-check-circle"></i></div>
                            <h5>Money-Back Guarantee</h5>
                            <p className="mb-0">Not satisfied? Get a full refund within 30 days of purchase.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="faq" className="sectionPad">
            <div className="container">
                <h3 className="sectionHead center">Frequently Asked Questions</h3>
                <div className="accordion" id="generalAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#generalOne" aria-expanded="true" aria-controls="generalOne">
                        Accordion Item #1
                      </button>
                    </h2>
                    <div id="generalOne" className="accordion-collapse collapse show" data-bs-parent="#generalAccordion">
                      <div className="accordion-body">
                        <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#generalTwo" aria-expanded="false" aria-controls="generalTwo">
                        Accordion Item #2
                      </button>
                    </h2>
                    <div id="generalTwo" className="accordion-collapse collapse" data-bs-parent="#generalAccordion">
                      <div className="accordion-body">
                        <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#generalThree" aria-expanded="false" aria-controls="generalThree">
                        Accordion Item #3
                      </button>
                    </h2>
                    <div id="generalThree" className="accordion-collapse collapse" data-bs-parent="#generalAccordion">
                      <div className="accordion-body">
                        <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </section>
        <Globe/>
    </>
  );
}
