module.exports = (caseDetails) => {
	const convertDate = (date) => new Date(date).toDateString();
	const involved = caseDetails.involved;
	const responses = caseDetails.authorityResponse;
	const imageUrls = caseDetails.injuries;

	return `
    <!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pdf template</title>
        <style>
        .pdf-main {
            margin: auto;
            width: 85%;
            display:flex;
            align-items: center;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, .095);
        }

        .pdf-header {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: auto;
            width: 80%;
        }

        .logo {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: auto;
            width: 80%;
            text-align: center;
        }

        .logo img {
            width: 30px;
            height: 30px;
            text-align: center;
        }

        .detail-header h1 {
            font-weight: 400;
            font-family: 'Lato', sans-serif;
            color:#17448a ;
            text-align: center;
        }

        .detail-header h3 {
            font-weight: 400;
            font-family: 'Lato', sans-serif;
            color:rgba(0, 0, 0, 0.7) ;
            text-align: center;
        }

        .detail-date-row h5{
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            font-family: 'Lato', sans-serif;
        }

        .detail-date-row h6{
            font-weight: 400;
            font-family: 'Lato', sans-serif;
        }

        .separator {
            height: 1px;
            width: 95%;
            background-color: rgba(0, 0, 0, 0.2);
            margin-top: 0.2rem;
            margin-bottom: 0.5rem;
            margin: auto;
        }

        .detail-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 40%;
        }

        .detail-row h5 {
            color: rgba(0, 0, 0, 0.5);
            font-weight: 400;
            font-family: 'Lato', sans-serif;
        }

        .detail-row h6 {
            font-family: 'Lato', sans-serif;
            font-weight: 400;
        }

        .description-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 70%;
        }

        .description-row h5 {
            color: rgba(0, 0, 0, 0.5);
            font-weight: 400;
            font-family: 'Lato', sans-serif;
        }

        .description-row h6 {
            font-family: 'Lato', sans-serif;
            font-weight: 400;
        }

        .description-inner-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .image {
            width: 50%;
        }

        .image img {
            width: 150px;
            height: 150px;
            border-radius: 5px;
        }

        .image h5 {
            color: rgba(0, 0, 0, 0.5);
            font-weight: 400;
            font-family: 'Lato', sans-serif;
        }

        .image p {
            color: #01579b;
            font-weight: 400;
            font-family: 'Lato', sans-serif;
        }

    </style>
    </head>
    <body>
        <div class="pdf-main">
            <div class="pdf-header">
                <div class="logo">
                    <img src="https://pbs.twimg.com/profile_images/727859453836599296/BzgGcwX5.jpg" alt="logo" />
					<img
						src="data:image/jpeg;base64,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"
						alt="logo"
					/>
					<img src="https://www.interregeurope.eu/fileadmin/user_upload/EC_logo.jpg" alt="logo" />
                </div>
            </div>
            <div class="detail-header">
                <h1>PELARD-N</h1>
            </div>
            <div class="separator"></div>
            <div class="detail-header">
                <h3>Case Report</h3>
            </div>
            <div class="detail-row">
                <h5>Date: </h5>
                <h6>${convertDate(caseDetails.dateTime)}</h6>
            </div>
            <div class="detail-row">
                <h5>Reporter Name: </h5>
                <h6>${caseDetails.reporter && caseDetails.reporter.name}</h6>
            </div>
            <div class="detail-row">
                <h5>Phone Number: </h5>
                <h6>${caseDetails.reporter && caseDetails.reporter.contact}</h6>
            </div>
            <div class="detail-row">
                <h5>Violation: </h5>
                <h6>${caseDetails && caseDetails.type}</h6>
            </div>
            <div class="detail-row">
                <h5>Location: </h5>
                <h6>${caseDetails.location && caseDetails.location.name}</h6>
            </div>
            <div class="description-row">
                <h5>Description: </h5>
                <h6>${caseDetails && caseDetails.description}</h6>
            </div>
                ${caseDetails.involved &&
					involved.map(
						(person) =>
							`
                        <div class="detail-row">
                            <h5>Person Involved: </h5>
                            <h6>${person.name}</h6>
                        </div>
                        <div class="detail-row">
                            <h5>Type: </h5>
                            <h6>${person.type}</h6>
                        </div>
                        `
					)}
                    ${caseDetails.authorityResponse &&
						responses.map(
							(response) =>
								`
                            <div class="detail-row">
                                <h5>Respondent Officer: </h5>
                                <h6>${response.name}</h6>
                            </div>
                            <div class="detail-row">
                                <h5>Response: </h5>
                                <h6>${response.response}</h6>
                            </div>
                            `
						)}
                        
                        ${caseDetails.injuries &&
							imageUrls.map(
								(url) =>
									`
                                    <div class="image">
                                    <h5>${url.description}; </h5>
                                        <img
                                            src=${url.link}
                                            alt="ingury image"    
                                        />
                                        <p>${url.link}</p>
                                    </div>
                                `
							)}
        </div>
    </body>
</html>`;
};
