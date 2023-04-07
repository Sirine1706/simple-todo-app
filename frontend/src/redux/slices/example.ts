/** @format */
export {}
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// import { showToast } from '../utils/toast';

// import axios from '../utils/axios';

// import { IResult } from '../types/models';

// import { SavingLoader } from '../utils/loaders';

// const LOADER_TIMEOUT = 2000;

// const initialState: {
//   selectedResult: IResult | null;

//   result: IResult | null;

//   results: IResult[] | [];

//   scoreStart: string | number;

//   scoreEnd: string | number;

//   Message: string;

//   status: 'idle' | 'loading' | 'succeeded' | 'failed';

//   error: string | null;

//   updatedNotSaved: boolean;

//   mediaType: 'image' | 'audio' | 'video';
// } = {
//   selectedResult: null,

//   result: null,

//   results: [],

//   scoreStart: '',

//   scoreEnd: '',

//   Message: '',

//   status: 'idle',

//   error: null,

//   updatedNotSaved: false,

//   mediaType: 'image',
// };

// export const updateResultOrder = createAsyncThunk(
//   'result/UpdateOrder',

//   async (payload: { resultIds: string[]; quizId: string }) => {
//     let data;

//     try {
//       const response = await axios.put(
//         `/quizzes/${payload.quizId}/results/order`,

//         {
//           resultIds: payload.resultIds,
//         }
//       );

//       data = await response.data.data;

//       if (response.status === 200) {
//         return data;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       return Promise.reject(error.message ? error.message : data?.message);
//     }
//   }
// );

// export const updateResult = createAsyncThunk(
//   'result/Update',

//   async (payload: { resultId: string; quizId: string; result: any }) => {
//     let data;

//     try {
//       const response = await axios.put(
//         `/quizzes/${payload.quizId}/results/${payload.resultId}`,

//         payload.result,

//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       data = await response.data.data;

//       if (response.status === 200) {
//         return data;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       console.log(error);

//       return Promise.reject(error.message ? error.message : data?.message);
//     }
//   }
// );

// export const initiateResult = createAsyncThunk(
//   'result/Initiate',

//   async (payload: any) => {
//     let data;

//     const quizId: string = payload.quizId;

//     const result: any = payload.result;

//     try {
//       const response = await axios.post(`/quizzes/${quizId}/results`, result);

//       data = await response.data.data;

//       if (response.status === 200) {
//         return data;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       console.log(error);

//       return Promise.reject(error.message ? error.message : data?.message);
//     }
//   }
// );

// export const deleteResult = createAsyncThunk(
//   'result/Delete',

//   async (payload: { quizId: string; resultId: string }) => {
//     try {
//       const response = await axios.delete(
//         `/quizzes/${payload.quizId}/results/${payload.resultId}`
//       );

//       if (response.status === 200) {
//         return;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       console.log(error);

//       return Promise.reject(
//         error.message ? error.message : 'Something went wrong!'
//       );
//     }
//   }
// );

// export const fetchResult = createAsyncThunk(
//   'result/Get',

//   async (payload: { quizId: string; resultId: string }) => {
//     let data;

//     try {
//       const response = await axios.get(
//         `/quizzes/${payload.quizId}/results/${payload.resultId}`
//       );

//       data = await response.data.data;

//       if (response.status === 200) {
//         return data;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       return Promise.reject(error.message ? error.message : data?.message);
//     }
//   }
// );

// export const fetchResults = createAsyncThunk(
//   'results/Get',

//   async (payload: { quizId: string }) => {
//     let data;

//     try {
//       const response = await axios.get(
//         `/quizzes/${payload.quizId}/results/all`
//       );

//       data = await response.data.data;

//       if (response.status === 200) {
//         return data;
//       }

//       throw new Error(response.statusText);
//     } catch (error: any) {
//       return Promise.reject(error.message ? error.message : data?.message);
//     }
//   }
// );

// const slice = createSlice({
//   name: 'result',

//   initialState,

//   reducers: {
//     setSelectedResult: (state, action: PayloadAction<IResult>) => {
//       state.selectedResult = action.payload;

//       state.scoreStart = action.payload?.scoreStart;

//       state.scoreEnd = action.payload?.scoreEnd;

//       state.Message = action.payload?.description;
//     },

//     updateScoreStart(state, action: PayloadAction<any>) {
//       state.scoreStart = action.payload;
//     },

//     updateScoreEnd(state, action: PayloadAction<any>) {
//       state.scoreEnd = action.payload;
//     },

//     updateMessage(state, action: PayloadAction<any>) {
//       state.Message = action.payload;
//     },

//     setUpdatedNotSaved: (state, action: PayloadAction<boolean>) => {
//       state.updatedNotSaved = action.payload;
//     },

//     setMediaType: (
//       state: any,

//       action: PayloadAction<'image' | 'audio' | 'video'>
//     ) => {
//       state.mediaType = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     // Get

//     builder.addCase(fetchResult.pending, (state) => {
//       state.status = 'loading';
//     });

//     builder.addCase(
//       fetchResult.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         state.selectedResult = action.payload;

//         state.result = action.payload;
//       }
//     );

//     builder.addCase(
//       fetchResult.rejected,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'failed';

//         state.error = action.payload;
//       }
//     ); // Get All

//     builder.addCase(fetchResults.pending, (state) => {
//       state.status = 'loading';
//     });

//     builder.addCase(
//       fetchResults.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         state.results = action.payload;
//       }
//     );

//     builder.addCase(
//       fetchResults.rejected,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'failed';

//         state.error = action.payload;
//       }
//     ); // Create

//     builder.addCase(initiateResult.pending, (state) => {
//       state.status = 'loading';
//     });

//     builder.addCase(
//       initiateResult.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         state.result = action.payload;
//       }
//     );

//     builder.addCase(
//       initiateResult.rejected,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'failed';

//         state.error = action.payload;
//       }
//     ); // Delete

//     builder.addCase(deleteResult.pending, (state) => {
//       state.status = 'loading';
//     });

//     builder.addCase(
//       deleteResult.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         SavingLoader(LOADER_TIMEOUT);
//       }
//     );

//     builder.addCase(
//       deleteResult.rejected,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'failed';

//         state.error = action.payload;
//       }
//     ); // Update

//     builder.addCase(updateResult.pending, (state) => {
//       state.status = 'loading';
//     });

//     builder.addCase(
//       updateResult.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         const newResult = action.payload;

//         state.selectedResult = newResult;

//         SavingLoader(LOADER_TIMEOUT);
//       }
//     );

//     builder.addCase(
//       updateResult.rejected,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'failed';

//         state.error = action.payload;
//       }
//     ); // UPDATE ORDER

//     builder.addCase(
//       updateResultOrder.fulfilled,

//       (state, action: PayloadAction<any>) => {
//         state.status = 'succeeded';

//         SavingLoader(LOADER_TIMEOUT);
//       }
//     );
//   },
// });

// export const {
//   updateMessage,

//   updateScoreStart,

//   updateScoreEnd,

//   setSelectedResult,

//   setUpdatedNotSaved,

//   setMediaType,
// } = slice.actions;

// export default slice.reducer;
