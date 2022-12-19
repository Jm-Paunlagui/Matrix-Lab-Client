import React, {useEffect, useState} from "react";

import LoadingPage from "../../../components/loading/LoadingPage";
import httpClient from "../../../http/httpClient";
import { toast } from "react-toastify";
import {Header} from "../../../components/headers/Header";
import {CsvQuestion, SchoolYearList, SemesterList} from "../../../components/listbox/ListBox";
/**
 * @description Handles the admin profile
 */
export default function OverallDashboard() {
  const [data, setData] = useState({
    loading: true,
    details: [],
  });

  const { loading, details} = data;

  useEffect(() => {
    httpClient
        .get("/data/get-all-data-from-csv")
        .then((response) => {
          setData({
            ...data,
            loading: false,
            details: response.data.details,
          });
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              toast.error("Unauthorized Access");
              window.location.href = "/unauthorized-access";
              break;
            case 440:
              toast.error("Session Expired");
              window.location.href = "/login-timeout";
              break;
            default:
              toast.error("Something went wrong");
              window.location.href = "/page-not-found";
          }
        });
  }, []);

  const [analysis, setAnalysis] = useState({
    loading_analysis: true,
    overall_sentiments: [],
    image_path_polarity_v_sentiment: "",
    image_path_review_length_v_sentiment: "",
    image_path_wordcloud: "",
    image_path_wordcloud_positive: "",
    image_path_wordcloud_negative: "",
  });
  const { loading_analysis, overall_sentiments, image_path_polarity_v_sentiment, image_path_review_length_v_sentiment, image_path_wordcloud, image_path_wordcloud_positive, image_path_wordcloud_negative} = analysis;

  const [options, setOptions] = useState({
    school_year_to_choose: [],
    school_semester_to_choose: [],
    csv_question_to_choose: [],
  });
    const { school_year_to_choose, school_semester_to_choose, csv_question_to_choose } = options;

  const [polarityVsentiment, setPolarityVsentiment] = useState({
    loadingPV: true,
    x_axis: [],
    y_axis: [],
    svp: [],
    school_year: "",
    school_semester: "",
    csv_question: "",
    ok: false,
    error: false,
    errorMessage: "",
    textChange: "Check Analysis",
  });

  const { loadingPV, x_axis, y_axis, svp, school_year, school_semester, csv_question, ok, error, errorMessage, textChange } = polarityVsentiment;

  const loadPolarityVsentiment = (school_year, school_semester, csv_question) => {
    setPolarityVsentiment({
      ...polarityVsentiment,
      loadingPV: true,
    });
    httpClient.get(`/analysis/sentiment_vs_polarity/${school_year}/${school_semester}/${csv_question}`).then((response) => {
      console.log(response.data)
      setAnalysis({
        ...analysis,
        loading_analysis: false,
        overall_sentiments: response.data.overall_sentiments,
        image_path_polarity_v_sentiment: response.data.image_path_polarity_v_sentiment,
        image_path_review_length_v_sentiment: response.data.image_path_review_length_v_sentiment,
        image_path_wordcloud: response.data.image_path_wordcloud,
        image_path_wordcloud_positive: response.data.image_path_wordcloud_positive,
        image_path_wordcloud_negative: response.data.image_path_wordcloud_negative,
      })
    });
  }

  const optionsForPVS = () => {
    httpClient.get(`/analysis/options-for-file-data-dashboard`).then((response) => {
      loadPolarityVsentiment(response.data.school_year[0].school_year, response.data.school_semester[0].school_semester, response.data.csv_question[0].csv_question)
      setOptions({
        ...options,
        school_year_to_choose: response.data.school_year,
        school_semester_to_choose: response.data.school_semester,
        csv_question_to_choose: response.data.csv_question,
      })
      setPolarityVsentiment({
        ...polarityVsentiment,
        school_year: response.data.school_year[0].school_year,
        school_semester: response.data.school_semester[0].school_semester,
        csv_question: response.data.csv_question[0].csv_question,
      })
    });
  };

  const handleSelect = (name) => (value) => {
    setPolarityVsentiment({
        ...polarityVsentiment,
      [name]: value,
      errorMessage: "",
    });
  };

  useEffect(() => {
    optionsForPVS();
  }, []);

  useEffect(() => {
    loadPolarityVsentiment(school_year, school_semester, csv_question);
  }, [school_year, school_semester, csv_question]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      {loading ? (
        LoadingPage()
      ) : (
          <>
            <Header body="A data visualization dashboard for the sentiment analysis of the students' feedbacks."
                title="Dashboard"
            />
            <div className="grid grid-cols-2 py-8 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {details.map((detail) => (
                <div
                    className="flex items-start p-4 bg-blue-50 rounded-lg shadow"
                    key={detail.id}
                >
                  <div className="flex items-center justify-center">
                    <div
                        className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                            detail.id === 1
                                ? "bg-red-500"
                                : detail.id === 2
                                    ? "bg-teal-500"
                                    : detail.id === 3
                                        ? "bg-blue-500"
                                        : "bg-black"
                        }`}
                    >
                      <i className={detail.icon} />
                    </div>
                    <div className="flex flex-col items-start justify-center ml-4">
                      <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                        {detail.value}
                      </h1>
                      <h1 className="text-sm font-medium text-gray-500">
                        {detail.title}
                      </h1>
                    </div>
                  </div>
                </div>
            ))}
            </div>
            <div className="grid w-full grid-cols-1 mb-8">
              <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full">
                    <h1 className="text-base font-bold text-blue-500">
                      Show By
                    </h1>
                </div>
                <div className="w-full flex flex-col lg:flex-row place-content-end">
                  <div className="w-full flex">
                    <div className="w-1/2 px-2">
                      <SchoolYearList handleSelect={handleSelect}
                                      school_year={school_year}
                                      school_year_to_choose={school_year_to_choose}
                      />
                    </div>
                    <div className="w-1/2 px-2">
                      <SemesterList handleSelect={handleSelect}
                                    school_semester={school_semester}
                                    school_semester_to_choose={school_semester_to_choose}
                      />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CsvQuestion csv_question={csv_question}
                                 csv_question_to_choose={csv_question_to_choose}
                                 handleSelect={handleSelect}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 pb-8">
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Sentiments
                  </h1>
                </div>
                {overall_sentiments.map((overall) => (
                      <div className={`flex flex-col items-start justify-start w-full p-4 rounded-lg ${overall.color50}`} key={overall.id}>
                        <div className="flex items-center justify-center">
                          <div
                              className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  overall.color500
                              }`}
                          >
                            <i className={`${overall.icon}`} />
                          </div>
                          <div className="flex flex-col items-start justify-center ml-4">
                            <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                              {overall.percentage} %
                            </h1>
                            <h1 className="text-sm font-medium text-gray-500">
                              with {overall.value} responses from {overall.year}
                            </h1>
                          </div>
                        </div>
                      </div>
                ))}
              </div>
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Sentiment vs Polarity
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg">
                  <img alt="sentiment_v_pol" className="" src={`data:image/jpeg;base64,${image_path_polarity_v_sentiment}`} />
                </div>
              </div>
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Sentiment vs Response Length
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg">
                  <img alt="review_len_v_sentiment" className="" src={`data:image/jpeg;base64,${image_path_review_length_v_sentiment}`} />
                </div>
              </div>
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Word Cloud (Overall)
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg">
                  <img alt="wordcloud" className="" src={`data:image/jpeg;base64,${image_path_wordcloud}`} />
                </div>
              </div>
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Word Cloud (Overall - Positive)
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg">
                  <img alt="wordcloud" className="" src={`data:image/jpeg;base64,${image_path_wordcloud_positive}`} />
                </div>
              </div>
              <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                <div className="w-full lg:w-3/5">
                  <h1 className="text-md font-bold text-blue-500">
                    Word Cloud (Overall - Negative)
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg">
                  <img alt="wordcloud" className="" src={`data:image/jpeg;base64,${image_path_wordcloud_negative}`} />
                </div>
              </div>
            </div>
          </>
      )}
    </div>
  );
}
